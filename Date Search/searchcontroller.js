class SearchController {
    constructor(rootID) {
        this.rootID = rootID;
        this.locale = "nb-NO";
        this.run = this.run.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

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

