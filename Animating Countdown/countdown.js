function updateTimer(deadline) {
    const time = deadline - new Date();
    return {
        'days': Math.floor( time / (1000 * 60 * 60 * 24) ),
        'hours': Math.floor( (time / (1000 * 60 * 60)) % 24 ),
        'minutes': Math.floor( (time / 1000 / 60) % 60 ),
        'seconds': Math.floor( (time / 1000) % 60 ),
        'total': time
    };
}

function animateClock(span) {
    span.className = "turn";
    setTimeout(function() {
        span.className = "";
    }, 700);
}

function startTimer(id, deadline) {
    const timerInterval = setInterval(function () {
        const clock = document.getElementById(id);
        const timer = updateTimer(deadline);

        clock.innerHTML = '<span>' + timer.days + '</span>'
                        + '<span>' + timer.hours + '</span>'
                        + '<span>' + timer.minutes + '</span>'
                        + '<span>' + timer.seconds + '</span>';
        
        //animations
        const spans = clock.getElementsByTagName("span");
        animateClock(spans[3]);
        if(timer.seconds == 59) animateClock(spans[2]);
        if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
        if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);

        //check for end of timer
        if(timer.total < 1 || !unchanged) {
            clearInterval(timerInterval);
            clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
            unchanged = true;
        }

    }, 1000);
}

function update() {
    const name = document.querySelector('.name');
    const span = document.querySelector('[data-name]');
    const dateInput = document.querySelector('.dateInput')
    console.log(dateInput.value);
    const newDeadline = new Date(dateInput.value);
    newDeadline.setHours(0);
    const clock = document.getElementById('clock');
    //check if the clock has been stopped
    if(clock.innerHTML != '<span>0</span><span>0</span><span>0</span><span>0</span>') {
        unchanged = false;
    }
    startTimer("clock", newDeadline);
    span.textContent = name.value;
}

var unchanged = true;
window.onload = function () {    
    const deadline = new Date("May 27, 2023 00:00:00");
    startTimer("clock", deadline);
    const saveButton = document.querySelector('.saveButton');
    saveButton.addEventListener('click', update);
}