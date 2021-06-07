/**
 * Class for å finne datoer som kommer på ønskede ukedager.
 * Klassen finner de 10 neste år som har dato på gitt dag.
 */
class SearchController {
    /**
     * Initialiserer SearchController
     * @param {String} root - ID attributtet til HTML container-elementet (DIV) med HTML FORM elementet
     */
    constructor(rootID) {
        /** @private {String} */ this.rootID = rootID;
        /** @private {String} */ this.locale = "nb-NO";

        /**
         * Setter korrekt 'this' for hendelseshåndtererne
         */
        this.run = this.run.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    /**
     * Metode søker etter datoer som kommer på ønsket dag.
     * Metoden henter ut ønskede data (dato og dag) fra HTML elementer på websiden og viser resultatet
     * i en UL-liste på websiden.
     * @private
     */
    doSearch() {
        let invalidInput = false;

        const dateChooser = this.rootElement.querySelector('input[type="date"]');
        const startDate = dateChooser.value;
        if(startDate.trim() == "") {
            dateChooser.classList.add("datesearch_invaliddate");
            invalidInput = true;
        } else {
            dateChooser.classList.remove("datesearch_invaliddate");
        }

        const weekdayChooser = this.rootElement.querySelector('label[for="dayname"] > select');
        const weekday = parseInt(weekdayChooser.value);
        if(isNaN(weekday) || (weekday == -1)) {
            weekdayChooser.classList.add("datesearch_invalidday");
            invalidInput = true;
        } else {
            weekdayChooser.classList.remove("datesearch_invalidday");
        }

        if(invalidInput) return;

        const [year, month, day] = startDate.split('-');
        const date = new Date(year, month - 1, day);

        const options = {month: 'long', day: 'numeric'};
        this.rootElement.querySelector('[data-searchdate]').textContent =date.toLocaleDateString(this.locale, options);
        const dayName = weekdayChooser.querySelector(`option[value="${weekday}"]`).textContent.toLocaleLowerCase(this.locale);
        this.rootElement.querySelector('[data-chosenweekdeay]').textContent = dayName;

        const liList = this.rootElement.querySelector('[data-yearlist]').children;

        const count = liList.length;
        let i = 0;
        while (i < count) {
            let year = date.getFullYear();
            if(date.getDay() == weekday) {
                liList[i].textContent = year;
                i++;
            }
            date.setFullYear(year + 1);
        }

        this.rootElement.querySelector('[data-result]').classList.remove("hidden");
    }

    /**
     * Metode som binder SearchController mot HTML-elementer på websiden
     * @public
     */
    run() {
        this.rootElement = document.getElementById(this.rootID);
        this.rootElement.querySelector("button[data-dosearch]").addEventListener("click", this.doSearch);
    }
}

/**
 * Initialiserer tre stk. SearchController på websiden.
 */
const controllerA = new SearchController("datovelgerA");
const controllerB = new SearchController("datovelgerB");
const controllerC = new SearchController("datovelgerC");

/**
 * De tre stk. SearchController bindes til HTML-elementer ved hendelse "DOMContentLoaded"
 */
document.addEventListener("DOMContentLoaded", controllerA.run);
document.addEventListener("DOMContentLoaded", controllerB.run);
document.addEventListener("DOMContentLoaded", controllerC.run);

