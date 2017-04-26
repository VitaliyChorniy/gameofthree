export class RegisterEventListener {
    constructor(id, event, callBack) {
        this.callBack = callBack;
        this.activator = document.getElementById(id);
        this.activator.addEventListener(event, this.callBack);
    }
}
