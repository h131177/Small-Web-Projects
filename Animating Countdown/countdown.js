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
        if(timer.total < 1) {
            clearInterval(timerInterval);
            clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
        }

    }, 1000);
}

window.onload = function () {
    const deadline = new Date("May 27, 2021 00:00:00");
    startTimer("clock", deadline);
}