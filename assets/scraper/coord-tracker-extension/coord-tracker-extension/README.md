# Coordinate Tracker — Chrome Extension

A floating, always-on-top overlay that shows your cursor's live X/Y
viewport coordinates as you move around any web page. Click anywhere
to "capture" that point — it's copied to your clipboard and logged in
a small history panel in the top-right corner.

## Install (unpacked / developer mode)

1. Unzip this folder somewhere permanent (don't delete it after — Chrome
   loads the extension directly from these files).
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** (toggle, top-right).
4. Click **Load unpacked**.
5. Select the unzipped `coord-tracker-extension` folder.
6. The extension icon (green crosshair) appears in your toolbar.

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
- It won't run on Chrome's internal pages (`chrome://...`) — that's a
  Chrome restriction on all extensions, not a bug.
- Toolbar icon clicks only toggle the *current* tab; other tabs are
  unaffected until you click the icon while they're active.

## File structure

```
coord-tracker-extension/
├── manifest.json     Extension config (Manifest V3)
├── background.js     Toggles overlay on toolbar icon click
├── content.js         Core overlay logic, injected into every page
├── overlay.css        Styling for badge, crosshair, history panel
└── icons/             Toolbar/extension icons
```
