// URL dan id olish
const params = new URLSearchParams(window.location.search);
const testId = params.get("id");

// Dynamic script loader
const script = document.createElement("script");
script.src = `data/${testId}.js`;
script.onload = initTest;
document.body.appendChild(script);

function initTest() {
  if (!window.readingData) {
    alert("Reading data not found");
    return;
  }

  // Title
  document.getElementById("test-title").innerText = readingData.title;

  // 🔥 ENG MUHIM QATORLAR
  document.getElementById("passage").innerHTML = readingData.passage;
  document.getElementById("questions").innerHTML = readingData.questions;

  startTimer(20);
}

// TIMER
function startTimer(minutes) {
  let time = minutes * 60;
  const timerEl = document.getElementById("timer");

  const interval = setInterval(() => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    timerEl.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
    time--;

    if (time < 0) {
      clearInterval(interval);
      alert("Time is up!");
    }
  }, 1000);
}