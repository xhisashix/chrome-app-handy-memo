const popupClass = require("./popup.class.js");
const popup = new popupClass();
const memo = document.getElementById("memo");
const title = document.getElementById("title");

document.addEventListener("blur", function (event) {
  var blurElement = event.target;
  var id = blurElement.id;
});

memo.addEventListener("blur", () => {
  popup.getActiveTabId().then((activeTabId) => {
    popup.saveMemo(activeTabId);
  });
});

title.addEventListener("blur", () => {
  popup.getActiveTabId().then((activeTabId) => {
    popup.saveTitle(activeTabId);
  });
});

document.addEventListener("click", function (event) {
  var clickedElement = event.target;
  var id = clickedElement.id;

  //if include memo_ in id
  if (id.includes("memo_")) {
    const navId = popup.getNavItemId(id);
    popup.activeNav(navId);
    popup.getActiveTabId().then((activeTabId) => {
      popup.getTargetVal(activeTabId);
    });
  }

  if (id === "reset_btn") {
    popup.clearMemo(title, memo);
  }

  if (id === "copy_btn") {
    popup.copyToClipboard(memo);
  }

  if (id === "generate_btn") {
    popup.addList();
  }

  if (id === "download_btn") {
    popup.download();
  }

  if (id === "h1") {
    popup.insertText("# ", memo);
  }

  if (id === "h2") {
    popup.insertText("## ", memo);
  }

  if (id === "h3") {
    popup.insertText("### ", memo);
  }

  if (id === "square") {
    popup.insertText("■ ", memo);
  }

  if (id === "date") {
    popup.insertText(new Date().toLocaleDateString(), memo);
  }

  if (id === "time") {
    popup.insertText(new Date().toLocaleTimeString(), memo);
  }
});
popup.getActiveTabId().then((activeTabId) => {
  popup.getTargetVal(activeTabId);
});

popup.addList();
