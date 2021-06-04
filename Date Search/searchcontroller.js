class SearchController {
    constructor(rootID) {
        this.rootID = rootID
        this.run = this.run.bind(this)
    }

    run() {
        this.rootElement = document.getElementById(this.rootID)

        console.log(this.rootElement)
    }
}

const controllerA = new SearchController("datovelgerA")
const controllerB = new SearchController("datovelgerB")
const controllerC = new SearchController("datovelgerC")

document.addEventListener("DOMContentLoaded", controllerA.run)
document.addEventListener("DOMContentLoaded", controllerB.run)
document.addEventListener("DOMContentLoaded", controllerC.run)

