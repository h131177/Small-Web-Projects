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

function startTimer(id, deadline) {
    const timeInterval = setInterval(function () {
        const clock = document.getElementById(id);
        const timer = updateTimer(deadline);

        clock.innerHTML = '<span>' + timer.days + '</span>'
                        + '<span>' + timer.hours + '</span>'
                        + '<span>' + timer.minutes + '</span>'
                        + '<span>' + timer.seconds + '</span>';

    }, 1000);
}

window.onload = function () {
    const deadline = new Date("May 27, 2021 00:00:00");
    startTimer("clock", deadline);
}