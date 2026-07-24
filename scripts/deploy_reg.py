import os
import sys
from pathlib import Path

import paramiko

HOST = "37.140.192.196"
USER = os.environ.get("REG_SSH_USER", "u3586175")
PASSWORD = os.environ.get("REG_SSH_PASS", "")
LOCAL_DIR = Path(__file__).resolve().parents[1] / "out"
REMOTE_ROOT = "www/dom-krovservice64.ru"


def connect():
    if not PASSWORD:
        raise SystemExit("Set REG_SSH_PASS env var")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(HOST, username=USER, password=PASSWORD, timeout=30)
    return client


def ensure_dir(sftp, remote_dir: str):
    current = ""
    for part in remote_dir.replace("\\", "/").split("/"):
        if not part:
            continue
        current = f"{current}/{part}" if current else part
        try:
            sftp.stat(current)
        except FileNotFoundError:
            sftp.mkdir(current)


def clear_remote(client, remote: str):
    # keep logs; wipe site files
    cmd = (
        f"cd {remote} && "
        "find . -mindepth 1 -maxdepth 1 ! -name 'logs' -exec rm -rf {} +"
    )
    _, stdout, stderr = client.exec_command(cmd)
    stdout.channel.recv_exit_status()
    err = stderr.read().decode("utf-8", errors="replace")
    if err.strip():
        print("clear warn:", err)


def upload_dir(sftp, local: Path, remote: str):
    ensure_dir(sftp, remote)
    count = 0
    for root, dirs, files in os.walk(local):
        rel = Path(root).relative_to(local).as_posix()
        remote_root = remote if rel == "." else f"{remote}/{rel}"
        ensure_dir(sftp, remote_root)
        for d in dirs:
            ensure_dir(sftp, f"{remote_root}/{d}")
        for name in files:
            local_file = Path(root) / name
            remote_file = f"{remote_root}/{name}"
            sftp.put(str(local_file), remote_file)
            count += 1
            if count % 25 == 0:
                print(f"... {count} files")
    print(f"Uploaded {count} files to {remote}")


def main():
    if not LOCAL_DIR.exists():
        raise SystemExit(f"Missing {LOCAL_DIR} — run npm run build first")
    print("Local:", LOCAL_DIR)
    client = connect()
    print("Connected. Clearing remote...")
    clear_remote(client, REMOTE_ROOT)
    sftp = client.open_sftp()
    upload_dir(sftp, LOCAL_DIR, REMOTE_ROOT)
    sftp.close()
    _, o, _ = client.exec_command(
        f"ls -la {REMOTE_ROOT} | head -30; "
        f"find {REMOTE_ROOT} -type f | wc -l"
    )
    print(o.read().decode("utf-8", errors="replace"))
    client.close()
    print("DONE")


if __name__ == "__main__":
    main()
