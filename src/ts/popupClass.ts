class popupClass {
  constructor() {}

  /**
   * save active tab id
   * @param {string} id
   */
  saveActiveTabId = (id: Number) => {
    chrome.storage.local.set({ activeTabId: id }, () => {
      console.log("save active tab id");
    });
  };

  /**
   * get active tab id
   * @returns {string} activeTabId
   */
  getActiveTabId = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["activeTabId"], (result) => {
        const activeTabId = result["activeTabId"];
        if (activeTabId) {
          this.activeNav(activeTabId);
          resolve(activeTabId);
        } else {
          this.activeNav(1);
          reject(new Error("Active tab ID not found."));
        }
      });
    });
  };

  /**
   * メモの情報を取得する
   * @param {string} targetVal
   * @returns {string} targetVal
   */
  getTargetVal = (itemId: number) => {
    const memo = document.getElementById("memo") as HTMLTextAreaElement;
    const title = document.getElementById("title") as HTMLInputElement;
    if (!memo || !title) return;
    chrome.storage.local.get([`memo_${itemId}`], (result) => {
      if (result[`memo_${itemId}`]) {
        memo.value = result[`memo_${itemId}`];
      } else {
        memo.value = "";
      }
    });
    chrome.storage.local.get([`title_${itemId}`], (result) => {
      if (result[`title_${itemId}`]) {
        title.value = result[`title_${itemId}`];
      } else {
        title.value = "";
      }
    });
  };

  /**
   * タイトルを保存する
   * @param {string} targetVal
   * @returns {string} targetVal
   */
  saveTitle = (itemId: number) => {
    const title = document.getElementById("title") as HTMLInputElement;
    if (!title) return;
    chrome.storage.local.set({ [`title_${itemId}`]: title.value }, () => {
      console.log("save title");
    });

    this._flashMessage();
  };

  /**
   * メモを保存する
   * @param {string} itemId
   * @returns {string} targetVal
   */
  saveMemo = (itemId: number) => {
    const memo = document.getElementById("memo") as HTMLTextAreaElement;
    if (!memo) return;
    chrome.storage.local.set({ [`memo_${itemId}`]: memo.value }, () => {
      console.log("save memo");
    });

    this._flashMessage();
  };

  /**
   * flash message
   */
  _flashMessage = () => {
    // Flash message
    const flash = document.getElementById("flash") as HTMLDivElement;
    flash.innerText = "saved!";
    flash.style.display = "block";
    setTimeout(() => {
      flash.style.display = "none";
    }, 500);
  };

  /**
   * メモをクリアする
   * @param {string} title
   * @param {string} memo
   * @returns {string} targetVal
   */
  clearMemo = (title: any, memo: any) => {
    title.value = "";
    memo.value = "";
    this.getActiveTabId().then((activeTabId) => {
      chrome.storage.local.set(
        {
          [`title_${activeTabId}`]: "",
          [`memo_${activeTabId}`]: "",
        },
        () => {
          console.log("clear memo");
        }
      );
    });
  };

  /**
   * メモをコピーする
   * @param {string} targetVal
   * @returns {string} targetVal
   */
  copyToClipboard = (copyText: any) => {
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    // Flash message
    const flash = document.getElementById("flash") as HTMLDivElement;
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
  insertText = (text: string, textarea: any) => {
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
    const memo = document.getElementById("memo") as HTMLTextAreaElement;
    const title = document.getElementById("title") as HTMLInputElement;
    if (!memo || !title) return;
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
      // number型をstring型に変換
      const itemId = i.toString();
      aElement.textContent = itemId;

      // a要素をli要素の子要素として追加
      liElement.appendChild(aElement);

      // li要素を親要素に追加
      if (!parentElement) return;
      parentElement.appendChild(liElement);
    }
  };

  /**
   * active nav link
   */
  activeNav = (itemId: Number) => {
    const navLinks = document.querySelectorAll(".nav-link");
    // remove active class
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });
    // add active class
    const activeLink = document.getElementById(`memo_${itemId}`);
    if (!activeLink) return;
    activeLink.classList.add("active");
    this.saveActiveTabId(itemId);
  };

  /**
   * get nav item id
   * @returns {string} itemId
   */
  getNavItemId = (id: string) => {
    const itemId = id.replace("memo_", "");
    const itemIdNumber = Number(itemId);
    return itemIdNumber;
  };
}

export default popupClass;