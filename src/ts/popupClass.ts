import storageClass from './storageClass';

class PopupClass {
  storage: storageClass;

  constructor() {
    const storage = new storageClass();
    this.storage = storage;
  }

  /**
   * Retrieves a value associated with a key from the local storage.
   * @private
   * @param {string} key - The storage key.
   * @returns {Promise<any>} A promise containing the retrieved value.
   */
  private _getStorageItem = (key: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], (result) => {
        if (result[key]) {
          resolve(result[key]);
        } else {
          reject(new Error(`${key} not found.`));
        }
      });
    });
  };

  /**
   * Shows a flash message to the user.
   * @private
   * @param {string} [message="saved!"] - The message to display.
   */
  private _flashMessage = (message: string = "saved!") => {
    const flash = document.getElementById("flash") as HTMLDivElement;
    if (!flash) return;

    flash.innerText = message;
    flash.style.display = "block";
    setTimeout(() => {
      flash.style.display = "none";
    }, 500);
  };

  /**
   * Saves the active tab's ID.
   * @param {number} id - The active tab's ID.
   */
  saveActiveTabId = (id: number) => {
    this.storage.setStorageItem("activeTabId", id);
  };

  /**
   * Retrieves the active tab's ID.
   * @returns {Promise<number>} A promise containing the active tab's ID.
   */
  getActiveTabId = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      this._getStorageItem("activeTabId")
        .then((activeTabId: number) => {
          this.activeNav(activeTabId);
          resolve(activeTabId);
        })
        .catch((err) => {
          this.activeNav(1);
          reject(err);
        });
    });
  };

  /**
   * Sets the value for the memo and title based on the item ID.
   * @param {number} itemId - The item ID.
   */
  getTargetVal = (itemId: number) => {
    const memo = document.getElementById("memo") as HTMLTextAreaElement;
    const title = document.getElementById("title") as HTMLInputElement;
    if (!memo || !title) return;

    this._getStorageItem(`memo_${itemId}`)
      .then((value) => (memo.value = value))
      .catch(() => (memo.value = ""));

    this._getStorageItem(`title_${itemId}`)
      .then((value) => (title.value = value))
      .catch(() => (title.value = ""));
  };

  /**
   * Saves the title.
   * @param {number} itemId - The item ID.
   * @param {HTMLInputElement} title - The title input element.
   */
  saveTitle = (itemId: number, title: HTMLInputElement) => {
    if (!title) return;
    this.storage.setStorageItem(`title_${itemId}`, title.value);
    this._flashMessage();
  };

  /**
   * Saves the memo.
   * @param {number} itemId - The item ID.
   * @param {HTMLTextAreaElement} memo - The memo textarea element.
   */
  saveMemo = (itemId: number, memo: HTMLTextAreaElement) => {
    if (!memo) return;
    this.storage.setStorageItem(`memo_${itemId}`, memo.value);
    this._flashMessage();
  };

  /**
   * Clears the memo.
   * @param {HTMLInputElement} title - The title input element.
   * @param {HTMLTextAreaElement} memo - The memo textarea element.
   */
  clearMemo = (title: HTMLInputElement, memo: HTMLTextAreaElement) => {
    if (!title || !memo) return;
    title.value = "";
    memo.value = "";

    this.getActiveTabId().then((activeTabId) => {
      this.storage.setStorageItem(`title_${activeTabId}`, "");
      this.storage.setStorageItem(`memo_${activeTabId}`, "");
    });
  };

  /**
   * Copies the text to the clipboard.
   * @param {HTMLTextAreaElement} copyText - The text to copy.
   */
  copyToClipboard = (copyText: HTMLTextAreaElement) => {
    if (!copyText) return;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    this._flashMessage("Copied!");
  };

  /**
   * Inserts the provided text at the cursor's position in the textarea.
   * @param {string} text - The text to insert.
   * @param {HTMLTextAreaElement} textarea - The textarea where the text will be inserted.
   */
  insertText = (text: string, textarea: HTMLTextAreaElement) => {
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const len = textarea.value.length;
    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end, len);

    textarea.value = before + text + after;
    textarea.setSelectionRange(start + text.length, start + text.length);
    textarea.focus();

    this.getActiveTabId().then((activeTabId) => {
      this.storage.setStorageItem(`memo_${activeTabId}`, textarea.value);
    });
  };

  /**
   * Allows the user to download the memo's content.
   */
  download = () => {
    const memo = document.getElementById("memo") as HTMLTextAreaElement;
    const title = document.getElementById("title") as HTMLInputElement;
    if (!memo || !title) return;

    const blob = new Blob([memo.value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.download = title.value || new Date().toLocaleString() + ".md";
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  /**
   * Adds a list of navigation items to the specified parent element.
   * @param {number} [count=10] - Number of navigation items to add.
   * @param {string} [parentElementId="nav"] - The ID of the parent element.
   */
  addList = (count: number = 10, parentElementId: string = "nav") => {
    const parentElement = document.getElementById(parentElementId);
    if (!parentElement) return;

    for (let i = 1; i <= count; i++) {
      const liElement = document.createElement("li");
      liElement.className = "nav-item";

      const aElement = document.createElement("a");
      aElement.className = "nav-link tab-btn";
      aElement.id = "memo_" + i;
      aElement.textContent = i.toString();

      liElement.appendChild(aElement);
      parentElement.appendChild(liElement);
    }
  };

  /**
   * Sets the specified navigation item as active.
   * @param {number} itemId - The ID of the navigation item.
   */
  activeNav = (itemId: number) => {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });

    const activeLink = document.getElementById(`memo_${itemId}`);
    if (activeLink) {
      activeLink.classList.add("active");
      this.saveActiveTabId(itemId);
    }
  };

  /**
   * Extracts the numeric ID from a string.
   * @param {string} id - The string containing the ID.
   * @returns {number} The extracted numeric ID.
   */
  getNavItemId = (id: string): number => {
    return Number(id.replace("memo_", ""));
  };

  /**
   * get current tab url
   */
  getCurrentTabUrl = () => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          resolve(tabs[0].url);
        } else {
          reject(new Error("No active tab found."));
        }
      });
    });
  };
}

export default PopupClass;
