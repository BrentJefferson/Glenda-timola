// popup.js

const linkInput = document.getElementById("linkInput");
const startBtn = document.getElementById("startBtn");
const statusEl = document.getElementById("status");

function log(msg, cls) {
  const line = document.createElement("div");
  if (cls) line.className = cls;
  line.textContent = msg;
  statusEl.appendChild(line);
  statusEl.scrollTop = statusEl.scrollHeight;
}

// Restore last-used link for convenience.
chrome.storage.local.get(["lastLink"], (res) => {
  if (res.lastLink) linkInput.value = res.lastLink;
});

// Reflect live progress while popup is open. If the user closes the popup,
// the run keeps going in the background (state lives in background.js),
// and reopening the popup will just show "running" again via getStatus.
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "GRABBER_LOG") {
    log(msg.text, msg.cls);
  }
  if (msg.type === "GRABBER_DONE") {
    startBtn.disabled = false;
    startBtn.textContent = "Start";
  }
});

startBtn.addEventListener("click", () => {
  const url = linkInput.value.trim();
  if (!url) {
    log("Paste a link first.", "err");
    return;
  }
  let validUrl;
  try {
    validUrl = new URL(url);
  } catch {
    log("That doesn't look like a valid URL.", "err");
    return;
  }

  chrome.storage.local.set({ lastLink: url });
  statusEl.innerHTML = "";
  startBtn.disabled = true;
  startBtn.textContent = "Running...";
  log(`Starting run for ${validUrl.href}`, "ok");

  chrome.runtime.sendMessage({ type: "START_GRAB", url: validUrl.href });
});

// On popup open, ask background if a run is already in progress so the UI
// reflects reality instead of always starting blank.
chrome.runtime.sendMessage({ type: "GET_STATUS" }, (res) => {
  if (res?.running) {
    startBtn.disabled = true;
    startBtn.textContent = "Running...";
    (res.log || []).forEach((l) => log(l.text, l.cls));
  }
});
