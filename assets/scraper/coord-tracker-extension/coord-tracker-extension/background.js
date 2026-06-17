// background.js
// Toggles the coordinate overlay on/off when the toolbar icon is clicked.

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_OVERLAY" });
  } catch (e) {
    // Content script may not be injected yet (e.g. chrome:// pages). Ignore.
    console.warn("Coordinate Tracker: could not reach content script", e);
  }
});
