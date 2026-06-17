# Coordinate Tracker — Chrome Extension

A floating, always-on-top overlay that shows your cursor's live X/Y
viewport coordinates as you move around any web page. Click anywhere
to "capture" that point — it's copied to your clipboard and logged in
a small history panel in the top-right corner.

## Install (unpacked / developer mode)

1. Open Chrome and go to `chrome://extensions`.
2. Turn on **Developer mode** (toggle, top-right).
3. Click **Load unpacked**.
4. Select this `coord-tracker-extension` folder.
5. The extension icon appears in your toolbar (default puzzle-piece
   icon since no custom icon is bundled — that's expected, not a bug).

## If it "doesn't work"

Most install failures come from one of these — check in order:

1. **Open `chrome://extensions` and look for a red "Errors" button**
   on the Coordinate Tracker card. Click it — it tells you exactly
   what failed (e.g. invalid manifest field, missing file).
2. **You toggled it but nothing shows up.** This was the original bug:
   clicking the toolbar icon only worked on tabs that loaded *after*
   the extension was installed. Tabs already open before install never
   got the content script. Fixed now — `background.js` falls back to
   injecting `content.js` + `overlay.css` directly into the tab if
   messaging fails on first click. Just click the icon again if it
   doesn't seem to respond the very first time.
3. **You're on a `chrome://`, `edge://`, or the Chrome Web Store page.**
   Extensions are blocked from running there by Chrome itself — try a
   normal website instead.
4. **Service worker shows "inactive."** Click "service worker" link on
   the extension card in `chrome://extensions` to wake it and check
   its console for errors.
5. **After editing any file here**, go back to `chrome://extensions`
   and click the refresh/reload icon on the extension card — Chrome
   doesn't auto-reload unpacked extensions on file changes.

## Usage

- Click the toolbar icon to turn the overlay on/off on the current tab.
- Or use the keyboard shortcut **Alt+Shift+C**.
- Move your mouse — a badge near the cursor shows `x: ___, y: ___`,
  plus a thin crosshair line tracks across the full viewport.
- Click anywhere on the page to capture that coordinate:
  - It's copied to your clipboard as `x, y`.
  - It's added to the history list (top-right panel).
  - A small ring pulses at the click point for visual confirmation.
- Click "clear" in the history panel to reset captured points.

## Notes

- Coordinates are **viewport-relative** (`clientX`/`clientY`), i.e.
  relative to the visible browser window, not the full page or screen.
  This matches what most browser automation tools (Selenium, Puppeteer,
  Playwright) expect when you tell them to click at a specific point.
- The overlay re-enables itself automatically on new pages within the
  same tab if it was left on, since state is stored via
  `chrome.storage.local`.
- Toolbar icon clicks only toggle the *current* tab; other tabs are
  unaffected until you click the icon while they're active.

## File structure

```
coord-tracker-extension/
├── manifest.json     Extension config (Manifest V3)
├── background.js     Toggles overlay on toolbar icon click + injects on demand
├── content.js         Core overlay logic, injected into every page
├── overlay.css        Styling for badge, crosshair, history panel
└── README.md          This file
```
