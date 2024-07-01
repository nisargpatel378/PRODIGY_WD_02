let timer;
let startTime;
let updatedTime;
let difference;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);

function startPause() {
  if (isRunning) {
    clearInterval(timer);
    startPauseBtn.textContent = 'Start';
  } else {
    startTime = new Date().getTime() - (difference || 0);
    timer = setInterval(updateTime, 1000);
    startPauseBtn.textContent = 'Pause';
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  difference = 0;
  display.textContent = '00:00:00';
  startPauseBtn.textContent = 'Start';
  laps = [];
  updateLaps();
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  display.textContent =
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds;
}

function addLap() {
  if (isRunning) {
    laps.push(display.textContent);
    updateLaps();
  }
}

function updateLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}
