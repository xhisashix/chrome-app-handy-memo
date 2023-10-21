import storageClass from "./storageClass";

class optionsClass {
  private storage: storageClass = new storageClass();
  constructor() {
    const storage = new storageClass();
    this.storage = storage;
  }


}

export default optionsClass;