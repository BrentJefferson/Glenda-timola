# Carousel Image Grabber — Chrome Extension + Python Server

Paste a link, click Start. The extension opens that link in a background
tab, automatically cycles through your carousel/gallery, grabs every image
URL, then hands the list off to a small local Python server, which does
the actual downloading and saves everything into a timestamped folder
right inside your scraper directory.

## Why a Python server?

Chrome extensions are sandboxed and can only save files inside your
browser's default Downloads folder — they cannot write to arbitrary
folders on disk. Running a tiny local server alongside the extension
sidesteps that restriction entirely: the server has normal filesystem
access, so files land exactly where you want them
(`scraper/downloads/<time>/`), no manual moving required.

## The exact flow it automates

1. Opens your pasted URL in a new background tab (doesn't steal focus).
2. Waits for that page to actually finish loading.
3. Loops:
   - Clicks `(1104, 134)` to reveal the download button.
   - Waits 3 seconds for it to render.
   - Reads the `href` of the `<a>` tag sitting at `(959, 279)`.
   - If that href was already captured earlier in this run → stop the
     loop (end of carousel reached).
   - Otherwise, saves it to the list.
   - Clicks `(756, 276)` to advance to the next image.
   - Waits 400ms, repeats.
4. Closes the automation tab.
5. Sends the full list of captured URLs to `http://127.0.0.1:8765/download`.
6. The Python server downloads each one and saves them into:
   `scraper/downloads/<HH-MM-SS>/001.jpg`, `002.jpg`, etc. — a fresh
   folder named after the time the run finished.

## Setup

### 1. Start the server (do this first, every time)

Open a terminal/command prompt in the scraper folder and run:

```
python server.py
```

Leave that window open — it needs to keep running in the background
while you use the extension. You'll see a confirmation line like:

```
Image Grabber server running on http://127.0.0.1:8765
Saving downloads under: C:\Users\TUF GAMING\Documents\freelance\clients\06-Ante Glenda\assets\scraper\downloads
```

No `pip install` needed — it only uses Python's built-in standard
library.

### 2. Load the extension

1. Go to `chrome://extensions`, enable **Developer mode**.
2. Click **Load unpacked**, select the `image-grabber-extension` folder.
3. Pin the extension icon to your toolbar.

## Usage

1. Make sure `server.py` is running (see above).
2. Click the toolbar icon.
3. Paste the link.
4. Click **Start**.
5. Watch the live log — it'll tell you exactly which folder the images
   landed in once the server finishes.

## Important limitations

- **Coordinates are hardcoded** to your own site's specific carousel
  layout. Pointing this at a different site/page layout will click the
  wrong thing or nothing at all.
- **The server must be running** before you click Start, or the run
  will finish capturing URLs but fail at the final "send to server"
  step with a clear error in the popup log.
- **Safety cap**: the capture loop stops automatically after 500
  iterations even if no duplicate is ever found.
- One run at a time on the extension side — starting a new run while
  one is in progress just logs a warning.
- If you ever move the scraper folder, update `SAVE_ROOT` at the top
  of `server.py` to match the new path.

## File structure

```
scraper/
├── server.py                     Python download server (run this first)
├── downloads/                    Created automatically, one folder per run
│   └── 14-32-05/
│       ├── 001.jpg
│       └── 002.jpg
└── image-grabber-extension/
    ├── manifest.json             Extension config (Manifest V3)
    ├── background.js             Capture loop + sends URLs to server.py
    ├── popup.html                UI: paste link, Start button, live log
    └── popup.js                  Popup logic, talks to background.js
```
