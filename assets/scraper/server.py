
#!/usr/bin/env python3
"""
server.py — local helper for the Carousel Image Grabber Chrome extension.

Run this manually before using the extension:
    python server.py

It listens on http://127.0.0.1:8765 and exposes one endpoint:

    POST /download
        Body (JSON): { "urls": ["https://...", "https://...", ...] }
        Action: creates a new timestamped folder under SAVE_ROOT, downloads
                every URL into it, and returns a JSON summary.
        Response: { "folder": "14-32-05", "saved": [...], "failed": [...] }

No third-party packages required — uses only the Python standard library,
so there's nothing to pip install.
"""

import json
import os
import time
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Where the timestamped run folders get created. Adjust this path if you move
# the scraper folder. Using a raw string (r"...") so backslashes are literal.
SAVE_ROOT = r"C:\Users\TUF GAMING\Documents\freelance\clients\06-Ante Glenda\assets\scraper\downloads"

HOST = "127.0.0.1"
PORT = 8765

# ---------------------------------------------------------------------------


def guess_extension(url: str) -> str:
    """Pull a file extension off the URL, defaulting to .jpg if none found."""
    path = url.split("?")[0].split("#")[0]
    _, ext = os.path.splitext(path)
    ext = ext.lower().lstrip(".")
    if ext in ("jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"):
        return ext
    return "jpg"


def download_one(url: str, dest_path: str) -> None:
    req = urllib.request.Request(
        url,
        headers={
            # Some hosts (e.g. CDNs) reject requests with no User-Agent.
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            )
        },
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        data = response.read()
    with open(dest_path, "wb") as f:
        f.write(data)


def timestamp_folder_name() -> str:
    return time.strftime("%H-%M-%S")


class Handler(BaseHTTPRequestHandler):
    def _send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        # Allow the Chrome extension (any origin) to call this local server.
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        # CORS preflight support.
        self._send_json(200, {})

    def do_POST(self):
        if self.path != "/download":
            self._send_json(404, {"error": "not found"})
            return

        try:
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length)
            payload = json.loads(raw.decode("utf-8"))
            urls = payload.get("urls", [])
        except Exception as e:
            self._send_json(400, {"error": f"invalid request body: {e}"})
            return

        if not urls:
            self._send_json(400, {"error": "no urls provided"})
            return

        folder_name = timestamp_folder_name()
        folder_path = os.path.join(SAVE_ROOT, folder_name)
        os.makedirs(folder_path, exist_ok=True)

        saved = []
        failed = []

        for i, url in enumerate(urls, start=1):
            ext = guess_extension(url)
            filename = f"{i:03d}.{ext}"
            dest_path = os.path.join(folder_path, filename)
            try:
                download_one(url, dest_path)
                saved.append(filename)
                print(f"  saved {filename}  <-  {url}")
            except Exception as e:
                failed.append({"url": url, "error": str(e)})
                print(f"  FAILED {filename}: {e}")

        self._send_json(
            200,
            {
                "folder": folder_name,
                "path": folder_path,
                "saved": saved,
                "failed": failed,
            },
        )

    def log_message(self, format, *args):
        # Quieter default logging; we print our own progress lines above.
        pass


def main():
    os.makedirs(SAVE_ROOT, exist_ok=True)
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Image Grabber server running on http://{HOST}:{PORT}")
    print(f"Saving downloads under: {SAVE_ROOT}")
    print("Leave this window open while using the extension. Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        server.shutdown()


if __name__ == "__main__":
    main()
