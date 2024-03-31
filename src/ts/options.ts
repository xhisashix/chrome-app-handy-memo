import storageClass from "./storageClass";
import optionsClass from "./optionsClass";
const storage = new storageClass();
const options = new optionsClass();


const form_option = document.forms.namedItem("optionsForm") as HTMLFormElement;
const option_sharp_1 = form_option.sharp_1 as HTMLInputElement;
const option_sharp_2 = form_option.sharp_2 as HTMLInputElement;
const option_sharp_3 = form_option.sharp_3 as HTMLInputElement;
const option_square = form_option.square as HTMLInputElement;
const option_date = form_option.date as HTMLInputElement;
const option_time = form_option.time as HTMLInputElement;
const option_url = form_option.url as HTMLInputElement;

const save = form_option.save as HTMLButtonElement;

function saveOptions() {
  storage.setStorageItem("sharp_1", option_sharp_1.value);
  storage.setStorageItem("sharp_2", option_sharp_2.value);
  storage.setStorageItem("sharp_3", option_sharp_3.value);
  storage.setStorageItem("square", option_square.value);
  storage.setStorageItem("date", option_date.value);
  storage.setStorageItem("time", option_time.value);
  storage.setStorageItem("url", option_url.value);
}


options.attachStorageValue();
save.addEventListener("click", saveOptions);