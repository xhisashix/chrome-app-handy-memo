const popupClass = require("./popup.class.js");
const popup = new popupClass();
const memo = document.getElementById("memo");
const title = document.getElementById("title");

document.addEventListener("click", function (event) {
  var clickedElement = event.target;
  var id = clickedElement.id;

  while (true) {
    switch (id) {
      case "reset_btn":
        popup.clearMemo(title, memo);
        break;
      case "copy_btn":
        popup.copyToClipboard(memo);
        break;
      case "generate_btn":
        popup.addList();
        break;
      case "download_btn":
        popup.download();
        break;
      case "h1":
        popup.insertText("# ", memo);
        break;
      case "h2":
        popup.insertText("## ", memo);
        break;
      case "h3":
        popup.insertText("### ", memo);
        break;
      case "square":
        popup.insertText("■ ", memo);
        break;
      case "date":
        popup.insertText(new Date().toLocaleDateString(), memo);
        break;
      case "time":
        popup.insertText(new Date().toLocaleTimeString(), memo);
        break;
      default:
        if (!id.includes("memo_")) {
          break;
        }
        const navId = popup.getNavItemId(id);
        popup.activeNav(navId);
        popup.getActiveTabId().then((activeTabId) => {
          popup.getTargetVal(activeTabId);
        });
        break;
    }

    break;
  }
});

popup.getActiveTabId().then((activeTabId) => {
  popup.getTargetVal(activeTabId);
});

popup.addList();

document.addEventListener("DOMContentLoaded", function () {
  var timeoutId;

  title.addEventListener("keyup", function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      popup.getActiveTabId().then((activeTabId) => {
        popup.saveTitle(activeTabId);
      });
    }, 500);
  });

  memo.addEventListener("keyup", function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      popup.getActiveTabId().then((activeTabId) => {
        popup.saveMemo(activeTabId);
      });
    }, 500);
  });
});
