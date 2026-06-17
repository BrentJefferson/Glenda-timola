// content.js
// Floating, high-z-index overlay that tracks and displays live cursor
// viewport coordinates. Click anywhere to "capture" (lock) a coordinate,
// which copies it to the clipboard and pins a marker on the page.
// Toggle visibility via the toolbar icon or Alt+Shift+C.

(function () {
  if (window.__coordTrackerInjected) return;
  window.__coordTrackerInjected = true;

  const STORAGE_KEY = "coordTrackerEnabled";
  let enabled = false;
  let badge = null;
  let crosshairV = null;
  let crosshairH = null;
  let history = []; // captured points this session
  let historyPanel = null;

  function createOverlayElements() {
    badge = document.createElement("div");
    badge.id = "__coord-tracker-badge";
    badge.textContent = "x: 0, y: 0";

    crosshairV = document.createElement("div");
    crosshairV.id = "__coord-tracker-crosshair-v";

    crosshairH = document.createElement("div");
    crosshairH.id = "__coord-tracker-crosshair-h";

    historyPanel = document.createElement("div");
    historyPanel.id = "__coord-tracker-history";
    historyPanel.innerHTML = `<div class="__coord-tracker-history-title">Captured points <span class="__coord-tracker-clear" id="__coord-tracker-clear">clear</span></div><div class="__coord-tracker-history-list" id="__coord-tracker-history-list"></div>`;

    document.documentElement.appendChild(badge);
    document.documentElement.appendChild(crosshairV);
    document.documentElement.appendChild(crosshairH);
    document.documentElement.appendChild(historyPanel);

    historyPanel
      .querySelector("#__coord-tracker-clear")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        history = [];
        renderHistory();
      });
  }

  function renderHistory() {
    const list = document.getElementById("__coord-tracker-history-list");
    if (!list) return;
    if (history.length === 0) {
      list.innerHTML = `<div class="__coord-tracker-empty">Click anywhere to capture a point</div>`;
      return;
    }
    list.innerHTML = history
      .slice()
      .reverse()
      .map(
        (p, i) =>
          `<div class="__coord-tracker-history-item">#${history.length - i}&nbsp; x: ${p.x}, y: ${p.y}</div>`
      )
      .join("");
  }

  function onMouseMove(e) {
    if (!enabled) return;
    const x = e.clientX;
    const y = e.clientY;

    badge.textContent = `x: ${x}, y: ${y}`;

    // Keep badge near cursor but clamp inside viewport so it never clips off-screen.
    const offset = 18;
    const badgeRect = badge.getBoundingClientRect();
    let left = x + offset;
    let top = y + offset;
    if (left + badgeRect.width > window.innerWidth) {
      left = x - badgeRect.width - offset;
    }
    if (top + badgeRect.height > window.innerHeight) {
      top = y - badgeRect.height - offset;
    }
    badge.style.left = `${Math.max(0, left)}px`;
    badge.style.top = `${Math.max(0, top)}px`;

    crosshairV.style.left = `${x}px`;
    crosshairH.style.top = `${y}px`;
  }

  function onClick(e) {
    if (!enabled) return;
    // Ignore clicks on our own UI (e.g. the clear button, history panel).
    if (e.target.closest("#__coord-tracker-history")) return;

    const point = { x: e.clientX, y: e.clientY };
    history.push(point);
    renderHistory();

    const text = `${point.x}, ${point.y}`;
    navigator.clipboard?.writeText(text).catch(() => {});

    flashCapture(point.x, point.y);
  }

  function flashCapture(x, y) {
    const ring = document.createElement("div");
    ring.className = "__coord-tracker-capture-ring";
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    document.documentElement.appendChild(ring);
    setTimeout(() => ring.remove(), 500);
  }

  function setEnabled(value) {
    enabled = value;
    if (enabled) {
      if (!badge) createOverlayElements();
      badge.style.display = "block";
      crosshairV.style.display = "block";
      crosshairH.style.display = "block";
      historyPanel.style.display = "block";
      renderHistory();
      document.addEventListener("mousemove", onMouseMove, true);
      document.addEventListener("click", onClick, true);
    } else {
      if (badge) {
        badge.style.display = "none";
        crosshairV.style.display = "none";
        crosshairH.style.display = "none";
        historyPanel.style.display = "none";
      }
      document.removeEventListener("mousemove", onMouseMove, true);
      document.removeEventListener("click", onClick, true);
    }
    chrome.storage?.local.set({ [STORAGE_KEY]: enabled });
  }

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type === "TOGGLE_OVERLAY") {
      setEnabled(!enabled);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.shiftKey && e.key.toLowerCase() === "c") {
      setEnabled(!enabled);
    }
  });

  // Restore state on page load (per Chrome storage, applies across navigations).
  chrome.storage?.local.get([STORAGE_KEY], (res) => {
    if (res && res[STORAGE_KEY]) {
      setEnabled(true);
    }
  });
})();
