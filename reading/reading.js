// ===============================
// IELTS Reading Loader
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const testId = params.get("id");

  if (!testId) {
    alert("Test ID yo‘q");
    return;
  }

  const script = document.createElement("script");
  script.src = `/ielts-mock/reading/data/${testId}.js`;

  script.onload = () => {
    if (!window.readingData) {
      alert("readingData topilmadi");
      return;
    }

    document.getElementById("test-title").innerText =
      window.readingData.title;

    document.getElementById("passage").innerHTML =
      window.readingData.passage;

    document.getElementById("questions").innerHTML =
      window.readingData.questions;

    startTimer(20);
  };

  script.onerror = () => {
    alert("p001.js yuklanmadi");
  };

  document.body.appendChild(script);
});

// ===============================
// TIMER
// ===============================
function startTimer(minutes) {
  let time = minutes * 60;
  const timerEl = document.getElementById("timer");

  setInterval(() => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    timerEl.innerText = `${m}:${s < 10 ? "0" : ""}${s}`;
    time--;
  }, 1000);
}