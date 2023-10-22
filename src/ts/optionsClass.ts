import storageClass from "./storageClass";

class optionsClass {
  private storage: storageClass = new storageClass();
  form_option: HTMLFormElement;
  option_sharp_1: HTMLInputElement;
  option_sharp_2: HTMLInputElement;
  option_sharp_3: HTMLInputElement;

  constructor() {
    const storage = new storageClass();
    this.storage = storage;
    this.form_option = document.forms.namedItem(
      "optionsForm"
    ) as HTMLFormElement;
    this.option_sharp_1 = this.form_option.sharp_1 as HTMLInputElement;
    this.option_sharp_2 = this.form_option.sharp_2 as HTMLInputElement;
    this.option_sharp_3 = this.form_option.sharp_3 as HTMLInputElement;
  }

  /**
   * attach local storage value to form
   */
  async attachStorageValue() {
    this.option_sharp_1.value = await this.storage.getStorageItem("sharp_1");
    this.option_sharp_2.value = await this.storage.getStorageItem("sharp_2");
    this.option_sharp_3.value = await this.storage.getStorageItem("sharp_3");
  }
}

export default optionsClass;
