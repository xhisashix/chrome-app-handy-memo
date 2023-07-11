const memo = document.getElementById("memo");
const saveBtn = document.getElementById("save_btn");

chrome.storage.local.get(["memo"], (result) => {
  if (result.memo) memo.value = result.memo;
});

function saveMemo() {
  chrome.storage.local.set({ memo: memo.value }, () => {
    console.log("save memo");
  });
}

function clearMemo() {
  memo.value = "";
  chrome.storage.local.set({ memo: "" }, () => {
    console.log("clear memo");
  });
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

document.getElementById("memo").addEventListener("blur", saveMemo);
document.getElementById("reset_btn").addEventListener("click", clearMemo);
document.getElementById("copy_btn").addEventListener("click", copyToClipboard);
