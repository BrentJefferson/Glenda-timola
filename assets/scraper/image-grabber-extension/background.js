// background.js

const READ_IMAGE_AT = { x: 424, y: 265 };
const CLICK_ADVANCE = { x: 756, y: 276 };

const STEP_DELAY_MS = 2000;
const MAX_ITERATIONS = 500;

const SERVER_URL = "http://127.0.0.1:8765/download";

let state = {
  running: false,
  log: [],
};

function pushLog(text, cls) {
  state.log.push({ text, cls });

  chrome.runtime
    .sendMessage({
      type: "GRABBER_LOG",
      text,
      cls,
    })
    .catch(() => {});
}

function finishRun() {
  state.running = false;

  chrome.runtime
    .sendMessage({
      type: "GRABBER_DONE",
    })
    .catch(() => {});
}

function sleep(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

function waitForTabLoad(tabId) {
  return new Promise((resolve) => {
    function listener(details) {
      if (
        details.tabId === tabId &&
        details.frameId === 0
      ) {
        chrome.webNavigation.onCompleted.removeListener(
          listener
        );

        resolve();
      }
    }

    chrome.webNavigation.onCompleted.addListener(
      listener
    );
  });
}

function clickAt(x, y) {
  const el = document.elementFromPoint(x, y);

  if (!el) {
    return {
      success: false,
      reason: "No element at point",
    };
  }

  const info = {
    success: true,
    tag: el.tagName,
    id: el.id,
    className: el.className,
    text: (el.innerText || "").slice(0, 100),
  };

  try {
    el.click();

    const opts = {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
    };

    el.dispatchEvent(
      new MouseEvent("mousedown", opts)
    );

    el.dispatchEvent(
      new MouseEvent("mouseup", opts)
    );

    el.dispatchEvent(
      new MouseEvent("click", opts)
    );

    info.clicked = true;
  } catch (e) {
    info.clicked = false;
    info.error = e.message;
  }

  return info;
}

function readImageAt(x, y) {
  const el = document.elementFromPoint(x, y);

  if (!el) {
    return null;
  }

  const img =
    el.tagName === "IMG"
      ? el
      : el.closest("img");

  if (!img) {
    return null;
  }

  return img.currentSrc || img.src || null;
}

async function sendToServer(urls) {
  const res = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({ urls }),
  });

  if (!res.ok) {
    const text = await res
      .text()
      .catch(() => "");

    throw new Error(
      `Server responded ${res.status}: ${text}`
    );
  }

  return res.json();
}

async function runGrab(url) {
  state.running = true;
  state.log = [];

  pushLog(
    `Opening ${url} in a new tab...`
  );

  const tab =
    await chrome.tabs.create({
      url,
      active: false,
    });

  pushLog(
    "Waiting for page to fully load..."
  );

  await waitForTabLoad(tab.id);

  // give React/Vue apps time to hydrate
  await sleep(1000);

  pushLog(
    "Page loaded. Starting capture loop..."
  );

  const collected = [];
  let stoppedOnDuplicate = false;

  for (
    let i = 0;
    i < MAX_ITERATIONS;
    i++
  ) {
    const results =
      await chrome.scripting.executeScript({
        target: {
          tabId: tab.id,
        },
        func: readImageAt,
        args: [
          READ_IMAGE_AT.x,
          READ_IMAGE_AT.y,
        ],
      });

    const href =
      results?.[0]?.result;

    if (!href) {
      pushLog(
        `Item ${
          i + 1
        }: image href could not be read.`,
        "err"
      );
      break;
    }

    if (
      collected.includes(href)
    ) {
      pushLog(
        `Item ${
          i + 1
        }: duplicate detected — end of carousel reached.`,
        "ok"
      );

      stoppedOnDuplicate = true;
      break;
    }

    collected.push(href);

    pushLog(
      `Item ${
        i + 1
      }: captured ${href.slice(
        0,
        60
      )}...`
    );

    const advanceResult =
      await chrome.scripting.executeScript({
        target: {
          tabId: tab.id,
        },
        func: clickAt,
        args: [
          CLICK_ADVANCE.x,
          CLICK_ADVANCE.y,
        ],
      });

    pushLog(
      `Advance target: ${JSON.stringify(
        advanceResult?.[0]?.result
      )}`
    );

    await sleep(
      STEP_DELAY_MS
    );
  }

  if (
    !stoppedOnDuplicate &&
    collected.length ===
      MAX_ITERATIONS
  ) {
    pushLog(
      `Hit safety cap of ${MAX_ITERATIONS} items.`,
      "err"
    );
  }

  pushLog(
    `Collected ${collected.length} image(s). Closing automation tab...`
  );

  await chrome.tabs.remove(
    tab.id
  );

  if (
    collected.length === 0
  ) {
    pushLog(
      "Nothing to send.",
      "err"
    );

    finishRun();
    return;
  }

  pushLog(
    `Sending ${collected.length} URL(s) to local server for download...`
  );

  try {
    const result =
      await sendToServer(
        collected
      );

    pushLog(
      `Server saved ${result.saved.length} image(s) into folder "${result.folder}".`,
      "ok"
    );

    if (
      result.failed &&
      result.failed.length >
        0
    ) {
      pushLog(
        `${result.failed.length} item(s) failed to download.`,
        "err"
      );

      result.failed.forEach(
        (f) =>
          pushLog(
            `✗ ${f.url} — ${f.error}`,
            "err"
          )
      );
    }
  } catch (err) {
    pushLog(
      `Could not reach local server: ${err.message}`,
      "err"
    );

    pushLog(
      "Make sure server.py is running (python server.py).",
      "err"
    );
  }

  finishRun();
}

chrome.runtime.onMessage.addListener(
  (
    msg,
    sender,
    sendResponse
  ) => {
    if (
      msg.type ===
      "START_GRAB"
    ) {
      if (
        state.running
      ) {
        pushLog(
          "A run is already in progress.",
          "err"
        );

        return;
      }

      runGrab(msg.url).catch(
        (err) => {
          pushLog(
            `Run failed: ${err.message}`,
            "err"
          );

          finishRun();
        }
      );
    }

    if (
      msg.type ===
      "GET_STATUS"
    ) {
      sendResponse({
        running:
          state.running,
        log: state.log,
      });
    }
  }
);