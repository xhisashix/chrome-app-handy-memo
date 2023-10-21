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

    /**
   * Retrieves a value associated with a key from the local storage.
   * @private
   * @param {string} key - The storage key.
   * @returns {Promise<any>} A promise containing the retrieved value.
   */
    getStorageItem = (key: string): Promise<any> => {
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
}

export default storageClass;