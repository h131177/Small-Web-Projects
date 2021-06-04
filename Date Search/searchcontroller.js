class SearchController {
    constructor(rootID) {
        this.rootID = rootID;
        this.run = this.run.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    doSearch() {
        const dateChooser = this.rootElement.querySelector('input[type="date"]');
        const startDate = dateChooser.value;
        if(startDate.trim() == "") {
            dateChooser.classList.add("invaliddate");
        } else {
            dateChooser.classList.remove("invaliddate");
        }
        console.log(startDate);
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

