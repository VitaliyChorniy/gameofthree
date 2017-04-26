export class RegisterEventListener {
    constructor(id, event, callBack) {
        this.activator = document.getElementById(id)
        this.activator.addEventListener(event, this.onClick);
    }

    onClick(evt) {
      callBack();
    }
}
