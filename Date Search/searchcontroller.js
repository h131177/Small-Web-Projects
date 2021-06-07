class SearchController {
    constructor(rootID) {
        this.rootID = rootID;
        this.run = this.run.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    doSearch() {
        let invalidInput = false;

        const dateChooser = this.rootElement.querySelector('input[type="date"]');
        const startDate = dateChooser.value;
        if(startDate.trim() == "") {
            dateChooser.classList.add("invaliddate");
            invalidInput = true;
        } else {
            dateChooser.classList.remove("invaliddate");
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
    }

    run() {
        this.rootElement = document.getElementById(this.rootID);
        this.rootElement.querySelector("button[data-dosearch]").addEventListener("click", this.doSearch);
    }
}

const controllerA = new SearchController("datovelgerA");
// const controllerB = new SearchController("datovelgerB");
// const controllerC = new SearchController("datovelgerC");

document.addEventListener("DOMContentLoaded", controllerA.run);
// document.addEventListener("DOMContentLoaded", controllerB.run);
// document.addEventListener("DOMContentLoaded", controllerC.run);

