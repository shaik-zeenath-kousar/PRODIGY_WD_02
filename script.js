// script.js
let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

// Format time as mm:ss:ms
function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  const startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  display.textContent = '00:00:00';
  lapsList.innerHTML = '';
}

function addLap() {
  if (!isRunning) return;
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
