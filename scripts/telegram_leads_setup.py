#!/usr/bin/env python3
"""Настройка Telegram-бота для заявок на Reg.ru (несколько получателей).

1. Каждый менеджер пишет @krovservice64_bot команду /start
2. Запустите:
   set TELEGRAM_BOT_TOKEN=...
   set TELEGRAM_CHAT_IDS=id1,id2   (опционально; иначе из getUpdates)
   set REG_SSH_PASS=...
   python scripts/telegram_leads_setup.py
"""

from __future__ import annotations

import json
import os
import re
import urllib.request

import paramiko

HOST = "37.140.192.196"
USER = os.environ.get("REG_SSH_USER", "u3586175")
PASSWORD = os.environ.get("REG_SSH_PASS", "")
TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
CHAT_IDS_ENV = os.environ.get("TELEGRAM_CHAT_IDS", "") or os.environ.get(
    "TELEGRAM_CHAT_ID", ""
)

REMOTE_CONFIG = "lead-telegram.php"
# Уже подключённый получатель (не теряем, даже если getUpdates пустой)
KNOWN_CHAT_IDS = ["349188227"]


def api_get_updates(token: str) -> list[dict]:
    url = f"https://api.telegram.org/bot{token}/getUpdates?limit=50"
    with urllib.request.urlopen(url, timeout=15) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    if not data.get("ok"):
        raise SystemExit(f"getUpdates failed: {data}")
    return data.get("result", [])


def collect_chat_ids(updates: list[dict]) -> list[tuple[str, str]]:
    found: dict[str, str] = {}
    for item in updates:
        msg = item.get("message") or item.get("edited_message")
        if not msg:
            continue
        chat = msg.get("chat") or {}
        chat_id = chat.get("id")
        if chat_id is None:
            continue
        name = (
            chat.get("first_name")
            or chat.get("username")
            or chat.get("title")
            or "user"
        )
        found[str(chat_id)] = str(name)
    return [(cid, name) for cid, name in found.items()]


def parse_env_ids(raw: str) -> list[str]:
    if not raw.strip():
        return []
    return [p.strip() for p in re.split(r"[,;\s]+", raw) if p.strip()]


def send_test(token: str, chat_id: str) -> bool:
    payload = json.dumps(
        {
            "chat_id": chat_id,
            "text": "✅ Бот @krovservice64_bot: заявки с сайта будут приходить сюда",
        },
        ensure_ascii=False,
    ).encode("utf-8")
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return bool(data.get("ok"))


def php_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace("'", "\\'")


def upload_config(token: str, chat_ids: list[str]) -> None:
    if not PASSWORD:
        raise SystemExit("Set REG_SSH_PASS env var")

    ids_php = ",\n    ".join(f"'{php_escape(cid)}'" for cid in chat_ids)
    php = f"""<?php
return [
    'token' => '{php_escape(token)}',
    'chat_ids' => [
    {ids_php},
    ],
];
"""

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(HOST, username=USER, password=PASSWORD, timeout=30)

    _, stdout, _ = client.exec_command("pwd")
    home = stdout.read().decode("utf-8", errors="replace").strip()
    print("Remote home:", home)

    remote_path = f"{home}/{REMOTE_CONFIG}" if home else REMOTE_CONFIG
    sftp = client.open_sftp()
    with sftp.file(remote_path, "w") as f:
        f.write(php)
    sftp.chmod(remote_path, 0o600)
    sftp.close()
    client.close()
    print(f"Uploaded config to {remote_path}")
    print(f"Recipients ({len(chat_ids)}): {', '.join(chat_ids)}")


def main() -> None:
    if not TOKEN:
        raise SystemExit("Set TELEGRAM_BOT_TOKEN env var")

    ids: list[str] = []
    for cid in KNOWN_CHAT_IDS + parse_env_ids(CHAT_IDS_ENV):
        if cid not in ids:
            ids.append(cid)

    print("Reading getUpdates...")
    updates = api_get_updates(TOKEN)
    from_updates = collect_chat_ids(updates)
    if from_updates:
        for cid, name in from_updates:
            print(f"Found chat: {name} -> {cid}")
            if cid not in ids:
                ids.append(cid)
    else:
        print("No new updates (ok if chat_ids already known).")

    if not ids:
        raise SystemExit("No chat_id found. Send /start to the bot first.")

    for cid in ids:
        ok = send_test(TOKEN, cid)
        print(f"Test to {cid}: {'ok' if ok else 'FAILED'}")

    upload_config(TOKEN, ids)
    print("Done.")


if __name__ == "__main__":
    main()
