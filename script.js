// Stopwatch variables
let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;

// Timer display update function
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 1000;
  let ms = Math.floor(diffInMs);

  return `${pad(hh, 2)}:${pad(mm, 2)}:${pad(ss, 2)}.${pad(ms, 3)}`;
}

// Padding function for two-digit numbers
function pad(num, size) {
  let s = "000" + num;
  return s.substr(s.length - size);
}

// Update the timer display every 10ms
function print(txt) {
  document.getElementById("timer").innerHTML = txt;
}

// Start timer
function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  showButton("PAUSE");
  isRunning = true;
}

// Pause timer
function pause() {
  clearInterval(timerInterval);
  showButton("START");
  isRunning = false;
}

// Reset timer
function reset() {
  clearInterval(timerInterval);
  print("00:00:00.000");
  elapsedTime = 0;
  showButton("START");
  document.getElementById("laps").innerHTML = "";
  isRunning = false;
}

// Record lap
function lap() {
  if (isRunning) {
    let lapTime = timeToString(elapsedTime);
    let lapElement = document.createElement("li");
    lapElement.innerText = lapTime;
    document.getElementById("laps").appendChild(lapElement);
  }
}

// Control button visibility
function showButton(buttonKey) {
  const startButton = document.getElementById("start");
  const pauseButton = document.getElementById("pause");

  if (buttonKey === "START") {
    startButton.style.display = "block";
    pauseButton.style.display = "none";
  } else {
    startButton.style.display = "none";
    pauseButton.style.display = "block";
  }
}

// Event Listeners
document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);

// Initialize button states
showButton("START");
