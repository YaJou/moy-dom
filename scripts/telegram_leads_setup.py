#!/usr/bin/env python3
"""Настройка Telegram-бота для заявок на Reg.ru.

1. Напишите @krovservice64_bot команду /start
2. Запустите:
   set TELEGRAM_BOT_TOKEN=...
   set TELEGRAM_CHAT_ID=...   (или скрипт попробует найти через getUpdates)
   set REG_SSH_PASS=...
   python scripts/telegram_leads_setup.py
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

import paramiko

HOST = "37.140.192.196"
USER = os.environ.get("REG_SSH_USER", "u3586175")
PASSWORD = os.environ.get("REG_SSH_PASS", "")
TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")

REMOTE_CONFIG = "lead-telegram.php"


def api_get_updates(token: str) -> list[dict]:
    url = f"https://api.telegram.org/bot{token}/getUpdates?limit=20"
    with urllib.request.urlopen(url, timeout=15) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    if not data.get("ok"):
        raise SystemExit(f"getUpdates failed: {data}")
    return data.get("result", [])


def pick_chat_id(updates: list[dict]) -> str | None:
    for item in reversed(updates):
        msg = item.get("message") or item.get("edited_message")
        if not msg:
            continue
        chat = msg.get("chat") or {}
        chat_id = chat.get("id")
        if chat_id is not None:
            name = chat.get("first_name") or chat.get("username") or "user"
            print(f"Found chat: {name} -> {chat_id}")
            return str(chat_id)
    return None


def send_test(token: str, chat_id: str) -> None:
    payload = json.dumps(
        {
            "chat_id": chat_id,
            "text": "✅ Бот @krovservice64_bot подключён к сайту dom-krovservice64.ru",
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    if not data.get("ok"):
        raise SystemExit(f"Test message failed: {data}")
    print("Test message sent.")


def upload_config(token: str, chat_id: str) -> None:
    if not PASSWORD:
        raise SystemExit("Set REG_SSH_PASS env var")

    php = f"""<?php
return [
    'token' => '{token}',
    'chat_id' => '{chat_id}',
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


def main() -> None:
    if not TOKEN:
        raise SystemExit("Set TELEGRAM_BOT_TOKEN env var")

    chat_id = CHAT_ID
    if not chat_id:
        print("TELEGRAM_CHAT_ID not set — reading getUpdates...")
        print("If empty, send /start to @krovservice64_bot and rerun.")
        updates = api_get_updates(TOKEN)
        chat_id = pick_chat_id(updates) or ""
        if not chat_id:
            raise SystemExit("No chat_id found. Send /start to the bot first.")

    send_test(TOKEN, chat_id)
    upload_config(TOKEN, chat_id)
    print("Done. Deploy site with lead.php, then test the form.")


if __name__ == "__main__":
    main()
