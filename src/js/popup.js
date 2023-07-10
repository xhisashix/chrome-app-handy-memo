// 要素が読み込まれるまで待つ
window.addEventListener("DOMContentLoaded", () => {
  const memo = document.getElementById("memo");
  const saveBtn = document.getElementById("save_btn");

  // click save button
  saveBtn.addEventListener("click", () => {
    chrome.storage.local.set({ memo: memo.value }, () => {
      console.log("save memo");
    });
  });

  chrome.storage.local.get(["memo"], (result) => {
    if(result.memo) memo.value = result.memo;
  });
});
