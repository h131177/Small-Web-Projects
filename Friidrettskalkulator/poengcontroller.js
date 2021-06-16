"use strict"

class PoengController {

    constructor(rootID) {
        this.rootID = rootID;

        this.run = this.run.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    calculate() {
        const eventChooser = this.rootElement.querySelector('select');
        const event = eventChooser.value;
        this.rootElement.querySelector('[data-event]').textContent = event;
        
        const inputChooser = this.rootElement.querySelector('input[type="text"]');
        const input = inputChooser.value;
        this.rootElement.querySelector('[data-input]').textContent = input;

        

        this.rootElement.querySelector('[data-result]').classList.remove("hidden");
    }

    run() {
        this.rootElement = document.getElementById(this.rootID);
        this.rootElement.querySelector("button").addEventListener("click", this.calculate);
    }
}

//Testing med verdier for 18 åringer
const eventInfo = new Map();
eventInfo.set('100m', {tusen: 11.35, multiplikator: 1.7});
eventInfo.set('200m', {tusen: 22.65, multiplikator: 0.85});
eventInfo.set('400m', {tusen: 51.00, multiplikator: 0.4});

const controllerRun = new PoengController("runRoot");
const controllerJump = new PoengController("jumpRoot");
const controllerThrow = new PoengController("throwRoot");

document.addEventListener("DOMContentLoaded", controllerRun.run);
document.addEventListener("DOMContentLoaded", controllerJump.run);
document.addEventListener("DOMContentLoaded", controllerThrow.run);