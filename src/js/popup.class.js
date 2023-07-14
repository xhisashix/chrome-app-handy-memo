class popupClass {
  constructor() {}

  /**
   * メモの情報を取得する
   * @param {string} targetVal
   * @returns {string} targetVal
   * @returns {string} targetVal
   */
  getTargetVal = (title, memo) => {
    const keyMemo = memo.getAttribute("id");
    const keyTitle = title.getAttribute("id");
    chrome.storage.local.get([keyMemo], (result) => {
      if (result[keyMemo]) memo.value = result[keyMemo];
    });
    chrome.storage.local.get([keyTitle], (result) => {
      if (result[keyTitle]) title.value = result[keyTitle];
    });
  };

  /**
   * タイトルを保存する
   * @param {string} targetVal
   * @returns {string} targetVal
   */
  saveTitle = (title) => {
    const keyTitle = title.getAttribute("id");
    chrome.storage.local.set({ [keyTitle]: title.value }, () => {
      console.log("save title");
    });

    this._flashMessage();
  };

  /**
   * メモを保存する
   * @param {string} targetVal
   * @returns {string} targetVal
   */
  saveMemo = (memo) => {
    const keyMemo = memo.getAttribute("id");
    chrome.storage.local.set({ [keyMemo]: memo.value }, () => {
      console.log("save memo");
    });

    this._flashMessage();
  };

  /**
   * flash message
   */
  _flashMessage = () => {
    flash.innerText = "saved!";
    flash.style.display = "block";
    setTimeout(() => {
      flash.style.display = "none";
    }, 500);
  };

  /**
   * メモをクリアする
   * @returns {string} targetVal
   */
  clearMemo = (title, memo) => {
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
  };

  /**
   * メモをコピーする
   * @param {string} targetVal
   * @returns {string} targetVal
   */
  copyToClipboard = (copyText) => {
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
  };

  /**
   * テキストエリアのカーソル行に文字を入力する
   * @param {string} text
   * @param {HTMLTextAreaElement} textarea
   * @return {string}
   */
  insertText = (text, textarea) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const len = textarea.value.length;
    const before = textarea.value.substr(0, start);
    const after = textarea.value.substr(end, len);
    textarea.value = before + text + after;
    textarea.setSelectionRange(start + text.length, start + text.length);
    textarea.focus();
    return textarea.value;
  };

  download = () => {
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
  };
}

module.exports = popupClass;
