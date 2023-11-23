import popupClass from "./popupClass";
const popup = new popupClass();
const memo = document.getElementById("memo") as HTMLTextAreaElement;
const title = document.getElementById("title") as HTMLInputElement;

document.addEventListener("click", function (event) {
  const clickedElement = event.target as HTMLElement;
  if (!clickedElement) return;
  const id = clickedElement.id;

  const actionMappings: { [key: string]: () => void } = {
    reset_btn: () => popup.clearMemo(title, memo),
    copy_btn: () => popup.copyToClipboard(memo),
    generate_btn: () => popup.addList(),
    download_btn: () => popup.download(),
    h1: () => popup.insertText("# ", memo),
    h2: () => popup.insertText("## ", memo),
    h3: () => popup.insertText("### ", memo),
    square: () => popup.insertText("■ ", memo),
    date: () => popup.insertText(`${new Date().toLocaleDateString()} `, memo),
    time: () => popup.insertText(`${new Date().toLocaleTimeString()} `, memo),
    url: () => {
      popup.getCurrentTabUrl().then((url) => {
        popup.insertText(url as string, memo);
      });
    },
  };

  if (actionMappings[id]) {
    actionMappings[id]();
  } else if (id.includes("memo_")) {
    const navId = popup.getNavItemId(id);
    popup.activeNav(navId);
    popup.getActiveTabId().then((activeTabId) => {
      popup.getTargetVal(activeTabId as number);
    });
  }
});

popup.getActiveTabId().then((activeTabId) => {
  popup.getTargetVal(activeTabId as number);
});

popup.addList();

document.addEventListener("DOMContentLoaded", function () {
  var timeoutId: any;

  title.addEventListener("keyup", function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      popup.getActiveTabId().then((activeTabId) => {
        popup.saveTitle(activeTabId, title);
      });
    }, 500);
  });

  memo.addEventListener("keyup", function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      popup.getActiveTabId().then((activeTabId) => {
        popup.saveMemo(activeTabId, memo);
      });
    }, 500);
  });
});

popup.addShowDisplayByFromOptions();