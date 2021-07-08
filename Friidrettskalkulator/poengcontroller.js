"use strict"

class PoengController {

    constructor(rootID) {
        this.rootID = rootID;

        this.run = this.run.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    calculate(e) {
        let invalidInput = false;
        const eventChooser = this.rootElement.querySelector('select');
        const event = eventChooser.value;
        this.rootElement.querySelector('[data-event]').textContent = event;
        
        const inputChooser = this.rootElement.querySelector('input[type="text"]');
        let input = inputChooser.value;
        this.rootElement.querySelector('[data-input]').textContent = input;

        const age = document.querySelector('[data-age]').value;
        this.rootElement.querySelector('[data-class]').textContent = age;

        let points = 0;
        const lettersRegExp = /[A-Za-zæøåÆØÅ,]/;

        if(input.trim() == "" || lettersRegExp.test(input)) {
            inputChooser.classList.add('invalidInput');
            invalidInput = true;
            this.rootElement.querySelector('[data-result]').classList.add("hidden");
            this.rootElement.querySelector('[data-errorMessage]').classList.add("hidden");
        } else  {
            inputChooser.classList.remove('invalidInput');
        }

        e.preventDefault();

        if(invalidInput) return;

        if(eventInfo.has(event + age)) {
            let temp;
            const info = eventInfo.get(event + age);

            //Sjekker om det er et løp over 400m og konverterer til sekunder
            if(info.gange == 10) {
                const tab = input.split(".");
                for(let i = 0; i < tab.length; i++) {
                    tab[i] = parseInt(tab[i]);
                }
                let hundreds = 0;
                if(tab.length == 3) {
                    hundreds = tab[2]/100;
                }
                input = tab[0]*60 + tab[1] + hundreds;
                console.log(input);
            }

            if(info.type != 'throw' && event != 'stav') {
                if(input > info.tusen) {
                    temp = Math.abs(input - info.tusen);
                    temp *= info.gange;
                    temp = Math.ceil(temp);
                    temp *= info.multiplikator;
                    if(info.type == "run") {
                        points = Math.floor(1000 - temp); 
                    } else {
                        points = Math.floor(1000 + temp); 
                    }   
                } else if(input < info.tusen) {
                    temp = Math.abs(info.tusen - input);
                    temp *= info.gange;
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
            } else {
                //Kode for kast og stav
                //Litt annerledes algoritme her
                if(input > info.tusen) {
                    temp = input - info.tusen;
                    temp *= 100;
                    temp = Math.ceil(temp);
                    temp *= info.multiplikatorOver;
                    points = 1000 + temp;
                } else if(input > info.attiprosent && input < info.tusen) {
                    temp = input - info.attiprosent;
                    temp *= 100;
                    temp = Math.ceil(temp);
                    temp *= info.multiplikator;
                    points = info.attipoeng + temp;
                } else if(input < info.attiprosent) {
                    temp = info.attiprosent - input;
                    temp *= 100;
                    temp = Math.ceil(temp);
                    temp *= info.multiplikatorUnder;
                    points = info.attipoeng - temp;
                } else if(input == info.tusen) {
                    points = 1000;
                } else if(input == info.attiprosent) {
                    points = info.attipoeng;
                }
                points = Math.floor(points);
            }
            
            if(points < 0) {
                points = 0;
            }
            console.log(points);
            this.rootElement.querySelector('[data-points]').textContent = points;
            this.rootElement.querySelector('[data-result]').classList.remove("hidden");
            this.rootElement.querySelector('[data-errorMessage]').classList.add("hidden");
        } else {
            console.log("Øvelsen finnes ikkje for den aldersklassen.");
            this.rootElement.querySelector('[data-errorMessage]').classList.remove("hidden");
            this.rootElement.querySelector('[data-result]').classList.add("hidden");
        }
        
    }

    run() {
        this.rootElement = document.getElementById(this.rootID);
        this.rootElement.querySelector("button").addEventListener("click", this.calculate);
    }
}

//TODO: Utvide med både alder og kjønn
//Testing med verdier for gutter 18 år
import {eventInfo} from './map.js'

const controllerRun = new PoengController("runRoot");
const controllerJump = new PoengController("jumpRoot");
const controllerThrow = new PoengController("throwRoot");

document.addEventListener("DOMContentLoaded", controllerRun.run);
document.addEventListener("DOMContentLoaded", controllerJump.run);
document.addEventListener("DOMContentLoaded", controllerThrow.run);