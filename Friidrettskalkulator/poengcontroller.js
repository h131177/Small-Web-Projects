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

        let points;

        if(eventInfo.has(event)) {
            let temp;
            const info = eventInfo.get(event);
            if(input > info.tusen) {
                temp = Math.abs(input - info.tusen);
                temp *= 100;
                temp = Math.ceil(temp);
                temp *= info.multiplikator;
                if(info.type == "run") {
                    points = Math.floor(1000 - temp); 
                } else {
                    points = Math.floor(1000 + temp); 
                }   
            } else if(input < info.tusen) {
                temp = Math.abs(info.tusen - input);
                temp *= 100;
                temp = Math.ceil(temp);
                temp *= info.multiplikator;
                if(info.type == "run") {
                    points = Math.floor(1000 + temp);
                } else {
                    points = Math.floor(1000 - temp);
                }
                
            } else {
                points = 1000;
            }
            console.log(points);
        }
        this.rootElement.querySelector('[data-points').textContent = points;

        this.rootElement.querySelector('[data-result]').classList.remove("hidden");
    }

    run() {
        this.rootElement = document.getElementById(this.rootID);
        this.rootElement.querySelector("button").addEventListener("click", this.calculate);
    }
}

//TODO: Utvide med både alder og kjønn
//Testing med verdier for gutter 18 år
const eventInfo = new Map();
eventInfo.set('100m', {tusen: 11.35, multiplikator: 1.7, type: "run"});
eventInfo.set('200m', {tusen: 22.65, multiplikator: 0.85, type: "run"});
eventInfo.set('400m', {tusen: 51.00, multiplikator: 0.4, type: "run"});
eventInfo.set('lengde', {tusen: 6.80, multiplikator: 2, type: "jump"});

const controllerRun = new PoengController("runRoot");
const controllerJump = new PoengController("jumpRoot");
const controllerThrow = new PoengController("throwRoot");

document.addEventListener("DOMContentLoaded", controllerRun.run);
document.addEventListener("DOMContentLoaded", controllerJump.run);
document.addEventListener("DOMContentLoaded", controllerThrow.run);