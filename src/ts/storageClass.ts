class storageClass {
  constructor() {}

  /**
   * Stores a key-value pair in the local storage.
   * @private
   * @param {string} key - The storage key.
   * @param {any} value - The value to be stored.
   */
  setStorageItem = (key: string, value: any) => {
    chrome.storage.local.set({ [key]: value }, () => {
      console.log(`Saved: ${key}`);
    });
  };
}

export default storageClass;