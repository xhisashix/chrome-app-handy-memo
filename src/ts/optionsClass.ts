import storageClass from "./storageClass";

class optionsClass {
  private storage: storageClass = new storageClass();
  form_option: HTMLFormElement;
  option_sharp_1: HTMLInputElement;
  option_sharp_2: HTMLInputElement;
  option_sharp_3: HTMLInputElement;
  option_square: HTMLInputElement;
  option_date: HTMLInputElement;
  option_time: HTMLInputElement;
  option_url: HTMLInputElement;

  constructor() {
    const storage = new storageClass();
    this.storage = storage;
    this.form_option = document.forms.namedItem(
      "optionsForm"
    ) as HTMLFormElement;
    this.option_sharp_1 = this.form_option.sharp_1 as HTMLInputElement;
    this.option_sharp_2 = this.form_option.sharp_2 as HTMLInputElement;
    this.option_sharp_3 = this.form_option.sharp_3 as HTMLInputElement;
    this.option_square = this.form_option.square as HTMLInputElement;
    this.option_date = this.form_option.date as HTMLInputElement;
    this.option_time = this.form_option.time as HTMLInputElement;
    this.option_url = this.form_option.url as HTMLInputElement;
  }

  /**
   * attach local storage value to form
   */
  async attachStorageValue() {
    this.option_sharp_1.value = await this.storage.getStorageItem("sharp_1");
    this.option_sharp_2.value = await this.storage.getStorageItem("sharp_2");
    this.option_sharp_3.value = await this.storage.getStorageItem("sharp_3");
    this.option_square.value = await this.storage.getStorageItem("square");
    this.option_date.value = await this.storage.getStorageItem("date");
    this.option_time.value = await this.storage.getStorageItem("time");
    this.option_url.value = await this.storage.getStorageItem("url");
  }
}

export default optionsClass;
