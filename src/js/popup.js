const memo = document.getElementById("memo");
const title = document.getElementById("title");
const resetBtn = document.getElementById("reset_btn");
const copyBtn = document.getElementById("copy_btn");
const $h1 = document.getElementById("h1");
const $h2 = document.getElementById("h2");
const $h3 = document.getElementById("h3");
const square = document.getElementById("square");
const date = document.getElementById("date");
const time = document.getElementById("time");
const downloadBtn = document.getElementById("download_btn");

function getTargetVal() {
  chrome.storage.local.get(["memo"], (result) => {
    if (result.memo) memo.value = result.memo;
  });
  chrome.storage.local.get(["title"], (result) => {
    if (result.title) title.value = result.title;
  });
}

function saveMemo() {
  chrome.storage.local.set({ memo: memo.value }, () => {
    console.log("save memo");
  });

  flash.innerText = "saved!";
  flash.style.display = "block";
  setTimeout(() => {
    flash.style.display = "none";
  }, 500);
}

function saveTitle() {
  chrome.storage.local.set({ title: title.value }, () => {
    console.log("save title");
  });

  flash.innerText = "saved!";
  flash.style.display = "block";
  setTimeout(() => {
    flash.style.display = "none";
  }, 500);
}

function clearMemo() {
  title.value = "";
  memo.value = "";
  chrome.storage.local.set(
    {
      title: "",
      memo: "",
    },
    () => {
      console.log("clear memo");
    }
  );
}

function copyToClipboard() {
  const copyText = document.getElementById("memo");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  // Flash message
  const flash = document.getElementById("flash");
  // add text
  flash.innerText = "Copied!";
  flash.style.display = "block";
  setTimeout(() => {
    flash.style.display = "none";
  }, 500);
}

/**
 * テキストエリアのカーソル行に文字を入力する
 * @param {string} text
 * @param {HTMLTextAreaElement} textarea
 * @return {string}
 */
function insertText(text, textarea) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const len = textarea.value.length;
  const before = textarea.value.substr(0, start);
  const after = textarea.value.substr(end, len);
  textarea.value = before + text + after;
  textarea.setSelectionRange(start + text.length, start + text.length);
  textarea.focus();
  return textarea.value;
}

function download() {
  const blob = new Blob([memo.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  if (title.value === "") {
    // 日付と時間を代入する
    title.value = new Date().toLocaleString();
  }
  a.download = `${title.value}.md`;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

memo.addEventListener("blur", saveMemo);
title.addEventListener("blur", saveTitle);
resetBtn.addEventListener("click", clearMemo);
copyBtn.addEventListener("click", copyToClipboard);
h1.addEventListener("click", () => {
  insertText("# ", memo);
});
h2.addEventListener("click", () => {
  insertText("## ", memo);
});
h3.addEventListener("click", () => {
  insertText("### ", memo);
});
square.addEventListener("click", () => {
  insertText("■ ", memo);
});
date.addEventListener("click", () => {
  insertText(new Date().toLocaleDateString(), memo);
});
time.addEventListener("click", () => {
  insertText(new Date().toLocaleTimeString(), memo);
});
downloadBtn.addEventListener("click", download);

getTargetVal();
