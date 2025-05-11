'user strict';

const timerText = document.querySelector('.timer_text');
const text = document.querySelector('.text');
const pomodoroButton = document.querySelector('.pomodoro');
const shortBreakButton = document.querySelector('.short_break');
const longBreakButton = document.querySelector('.long_break');
const pause = document.querySelector('.pause');
const clear = document.querySelector('.clear');
const statistics_pomodoro = document.querySelector('.statistics_pomodoro');
const statistics_breaks = document.querySelector('.statistics_breaks');

let defaultTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 15 * 60;
let pausedTime = 0;
let isRuning = false;
let timer;
let defaultValuePomodoro = 0;
let defaultValueBreaks = 0;

statistics_pomodoro.textContent = `Total Pomodoro : ${defaultValuePomodoro}`;
statistics_breaks.textContent = `Total Breaks : ${defaultValueBreaks}`;

text.style.fontSize = "13px"

function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0')
    const s = String(Math.floor(seconds % 60)).padStart(2, '0')
    return `${m}:${s}`
}

timerText.innerHTML = formatTime(defaultTime);

function parseTime(timeStr) {

    if (timeStr.includes(':')) {
        const [m, s] = timeStr.split(':').map(Number);
        return m * 60 + s;
    } else {
        return Number(timeStr);
    }
}


function pauseText() {
    if (isRuning) {
        clearInterval(timer)
        isRuning = false;
        pausedTime = parseTime(timerText.textContent);
        pause.textContent = 'Continue'

    } else {
        isRuning = true;
        pause.textContent = "Pause"

        timer = setInterval(() => {
            pausedTime--;
            timerText.textContent = formatTime(pausedTime);

            if (pausedTime <= 0) {
                clearInterval(timer)
                isRuning = false;
                text.textContent = "Time is Over"
                pause.textContent = "Pause"
            }
        }, 1000)
    }
}


function clearText() {
    clearInterval(timer)
    isRuning = false;

    if (timerText.textContent === formatTime(defaultTime)) {
        pausedTime = defaultTime = 25 * 60
        timerText.textContent = formatTime(defaultTime);
    } else if (timerText.textContent === formatTime(shortBreakTime)) {
        pausedTime = shortBreakTime = 5 * 60
        timerText.textContent = formatTime(shortBreakTime);
    } else if (timerText.textContent === formatTime(longBreakTime)) {
        pausedTime = longBreakTime = 15 * 60
        timerText.textContent = formatTime(longBreakTime);
    }

    pause.textContent = 'Pause'
    text.textContent = "";
}


pomodoroButton.addEventListener('click', function () {
    timerText.innerHTML = formatTime(defaultTime);
    if (!isRuning) {
        isRuning = true;
        timer = setInterval(() => {
            defaultTime--;
            timerText.innerHTML = formatTime(defaultTime);

            if (defaultTime <= 0) {
                clearInterval(timer);
                isRuning = false;
                text.innerHTML = "you worked well!"
                defaultValuePomodoro++;
                statistics_pomodoro.textContent = `Total Pomodoro : ${defaultValuePomodoro}`;
            }
        }, 1000)
    }
});

shortBreakButton.addEventListener('click', function () {
    timerText.innerHTML = formatTime(shortBreakTime);
    if (!isRuning) {
        isRuning = true;
        timer = setInterval(() => {
            shortBreakTime--;
            timerText.innerHTML = formatTime(shortBreakTime)

            if (defaultTime <= 0) {
                clearInterval(timer);
                isRuning = false;
                text.innerHTML = "your break is done";
                defaultValueBreaks++;
                statistics_breaks.textContent = `Total Breaks : ${defaultValueBreaks}`;
            }
        }, 1000);
    }
})

longBreakButton.addEventListener('click', function () {
    timerText.innerHTML = formatTime(longBreakTime);
    if (!isRuning) {
        isRuning = true;
        timer = setInterval(() => {
            longBreakTime--;
            timerText.innerHTML = formatTime(longBreakTime);

            if (defaultTime <= 0) {
                clearInterval(timer);
                isRuning = false;
                text.innerHTML = "your long break is done";
                defaultValueBreaks++;
                statistics_breaks.textContent = `Total Breaks : ${defaultValueBreaks}`;
            }
        }, 1000);
    }
})


pause.addEventListener('click', pauseText)
clear.addEventListener('click', clearText)