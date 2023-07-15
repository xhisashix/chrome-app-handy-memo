class popupClass {
  constructor() {}

  /**
   * save active tab id
   * @param {string} id
   */
  saveActiveTabId = (id) => {
    chrome.storage.local.set({ activeTabId: id }, () => {
      console.log("save active tab id");
    });
  };

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
  saveTitle = (title, itemId) => {
    const keyTitle = title.getAttribute("id");
    chrome.storage.local.set({ [`${keyTitle}_${itemId}`]: title.value }, () => {
      console.log("save title");
    });

    this._flashMessage();
  };

  /**
   * メモを保存する
   * @param {string} targetVal
   * @returns {string} targetVal
   */
  saveMemo = (memo, itemId) => {
    const keyMemo = memo.getAttribute("id");
    chrome.storage.local.set({ [`${keyMemo}_${itemId}`]: memo.value }, () => {
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

  /**
   * add list element
   */
  addList = () => {
    // 要素を作成する回数
    const count = 10;

    // 要素を追加する親要素のIDを指定
    var parentElementId = "nav";

    // 親要素を取得
    var parentElement = document.getElementById(parentElementId);

    // 要素を作成して親要素に追加するループ
    for (var i = 1; i <= count; i++) {
      // li要素を作成
      var liElement = document.createElement("li");
      liElement.className = "nav-item";

      // a要素を作成
      var aElement = document.createElement("a");
      aElement.className = "nav-link tab-btn";
      aElement.id = "memo_" + i;
      aElement.textContent = i;

      // a要素をli要素の子要素として追加
      liElement.appendChild(aElement);

      // li要素を親要素に追加
      parentElement.appendChild(liElement);
    }
  };

  /**
   * active nav link
   */
  activeNav = (itemId) => {
    const navLinks = document.querySelectorAll(".nav-link");
    // remove active class
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });
    // add active class
    const activeLink = document.getElementById(`memo_${itemId}`);
    activeLink.classList.add("active");
    this.saveActiveTabId(itemId);
  };

  /**
   * get nav item id
   * @returns {string} itemId
   */
  getNavItemId = (id) => {
    const itemId = id.replace("memo_", "");
    return itemId;
  };
}

module.exports = popupClass;
