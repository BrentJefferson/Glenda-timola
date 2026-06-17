// background.js
// Toggles the coordinate overlay on/off when the toolbar icon is clicked.
//
// Strategy: always make sure content.js + overlay.css are present in the
// tab first (injecting them is a no-op if already there, since content.js
// guards itself with window.__coordTrackerInjected), THEN send the toggle
// message. This avoids relying on sendMessage succeeding/failing as a way
// to detect whether the content script is already running.

async function ensureInjected(tabId) {
  await chrome.scripting.insertCSS({
    target: { tabId },
    files: ["overlay.css"],
  });
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["content.js"],
  });
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  if (!tab.url || /^(chrome|chrome-extension|edge|about):/.test(tab.url)) {
    console.warn("[Coordinate Tracker] cannot run on this page:", tab.url);
    return;
  }

  try {
    await ensureInjected(tab.id);
    await chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_OVERLAY" });
    console.log("[Coordinate Tracker] toggle sent to tab", tab.id);
  } catch (err) {
    console.error("[Coordinate Tracker] toggle failed:", err);
  }
});
