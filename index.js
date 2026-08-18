const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

function getSavedMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  return saved >= MIN_MINUTES && saved <= MAX_MINUTES ? saved : DEFAULT_MINUTES;
}

let remainingSeconds = getSavedMinutes() * 60;
let intervalId = null;

const timeDisplay = document.getElementById("time-display");

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function tick() {
  if (remainingSeconds <= 0) {
    stopTimer();
    return;
  }
  remainingSeconds--;
  updateDisplay();
}

function startTimer() {
  if (intervalId !== null) return;
  intervalId = setInterval(tick, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getSavedMinutes() * 60;
  updateDisplay();
}

updateDisplay();
