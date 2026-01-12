/* =====================================================
   IELTS READING ENGINE
   reading.js
   ===================================================== */

// ------------------ GLOBAL ------------------
let readingData = null;
let timeLeft = 20 * 60; // 20:00
let timerInterval = null;

// ------------------ ON LOAD ------------------
document.addEventListener("DOMContentLoaded", () => {
  loadTestData();
  startTimer();
  enableHighlight();
  document.getElementById("submitBtn").addEventListener("click", submitAnswers);
});

// ------------------ LOAD TEST ------------------
function loadTestData() {
  const params = new URLSearchParams(window.location.search);
  const testId = params.get("id") || "p001";

  const script = document.createElement("script");
  script.src = `data/${testId}.js`;
  script.onload = () => {
    if (!window.readingData) {
      alert("Reading data not found!");
      return;
    }
    readingData = window.readingData;
    renderReading();
  };
  script.onerror = () => {
    alert("Failed to load test data.");
  };

  document.body.appendChild(script);
}

// ------------------ RENDER ------------------
function renderReading() {
  document.getElementById("passage").innerHTML = readingData.passage;
  document.getElementById("questions").innerHTML = readingData.questions;

  setupCheckboxLimits();
}

// ------------------ TIMER ------------------
function startTimer() {
  const timerEl = document.getElementById("timer");

  timerInterval = setInterval(() => {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const sec = String(timeLeft % 60).padStart(2, "0");
    timerEl.textContent = `${min}:${sec}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitAnswers();
    }

    timeLeft--;
  }, 1000);
}

// ------------------ HIGHLIGHT ------------------
function enableHighlight() {
  document.addEventListener("mouseup", () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement("span");
    span.className = "highlight";
    range.surroundContents(span);
    selection.removeAllRanges();
  });
}

// ------------------ CHECKBOX LIMIT ------------------
function setupCheckboxLimits() {
  document.querySelectorAll("[data-max]").forEach(group => {
    const max = parseInt(group.dataset.max, 10);
    const checkboxes = group.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach(cb => {
      cb.addEventListener("change", () => {
        const checked = [...checkboxes].filter(c => c.checked);
        if (checked.length > max) {
          cb.checked = false;
        }
      });
    });
  });
}

// ------------------ SUBMIT ------------------
function submitAnswers() {
  clearInterval(timerInterval);

  let score = 0;
  let total = readingData.answers ? Object.keys(readingData.answers).length : 0;

  if (!readingData.answers) {
    showResult("Test submitted (answers not configured).");
    return;
  }

  // TEXT INPUTS
  document.querySelectorAll("input[type='text']").forEach((input, i) => {
    const correct = readingData.answers[`q${i + 1}`];
    if (!correct) return;

    if (input.value.trim().toLowerCase() === correct.toLowerCase()) {
      input.classList.add("correct");
      score++;
    } else {
      input.classList.add("wrong");
    }
  });

  // CHECKBOXES
  document.querySelectorAll("[data-q]").forEach(group => {
    const qid = group.dataset.q;
    const correct = readingData.answers[qid];
    if (!Array.isArray(correct)) return;

    const chosen = [...group.querySelectorAll("input:checked")].map(
      i => i.value
    );

    if (
      chosen.length === correct.length &&
      chosen.every(v => correct.includes(v))
    ) {
      score++;
      group.classList.add("correct");
    } else {
      group.classList.add("wrong");
    }
  });

  showResult(`Score: ${score} / ${total}`);
}

// ------------------ RESULT ------------------
function showResult(text) {
  const box = document.getElementById("result");
  box.textContent = text;
  box.style.display = "block";
}