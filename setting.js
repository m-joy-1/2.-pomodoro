const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const timerInput = document.getElementById("timer-input");
const submitBtn = document.getElementById("submit-btn");

function getSavedMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  return saved >= MIN_MINUTES && saved <= MAX_MINUTES ? saved : DEFAULT_MINUTES;
}

function isValidMinutes(value) {
  if (value === "") return false;
  const minutes = Number(value);
  return minutes >= MIN_MINUTES && minutes <= MAX_MINUTES;
}

function updateSubmitState() {
  submitBtn.disabled = !isValidMinutes(timerInput.value);
}

timerInput.value = getSavedMinutes();
timerInput.min = MIN_MINUTES;
timerInput.max = MAX_MINUTES;
updateSubmitState();

timerInput.addEventListener("input", updateSubmitState);

submitBtn.addEventListener("click", () => {
  if (!isValidMinutes(timerInput.value)) return;
  localStorage.setItem(STORAGE_KEY, Number(timerInput.value));
  location.href = "index.html";
});
