const popupClass = require("./popup.class.js");
const popup = new popupClass();
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

memo.addEventListener("blur", () => {
  popup.saveMemo(memo);
});
title.addEventListener("blur", () => {
  popup.saveTitle(title);
});
resetBtn.addEventListener("click", () => {
  popup.clearMemo(title, memo);
});

copyBtn.addEventListener("click", () => {
  popup.copyToClipboard(memo);
});
$h1.addEventListener("click", () => {
  popup.insertText("# ", memo);
});
$h2.addEventListener("click", () => {
  popup.insertText("## ", memo);
});
$h3.addEventListener("click", () => {
  popup.insertText("### ", memo);
});
square.addEventListener("click", () => {
  popup.insertText("■ ", memo);
});
date.addEventListener("click", () => {
  popup.insertText(new Date().toLocaleDateString(), memo);
});
time.addEventListener("click", () => {
  popup.insertText(new Date().toLocaleTimeString(), memo);
});

downloadBtn.addEventListener("click", popup.download);

popup.getTargetVal(title, memo);
