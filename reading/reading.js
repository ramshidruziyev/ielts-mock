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
// ================= SUBMIT & CHECK =================
document.getElementById("submitBtn").onclick = checkAnswers;

function checkAnswers() {
  const answerKey = window.readingData.answers;
  if (!answerKey) {
    alert("Answer key topilmadi");
    return;
  }

  let correct = 0;

  // TEXT INPUTS
  document.querySelectorAll("input[type='text']").forEach((input, index) => {
    const qNum = index + 1;
    if (!answerKey[qNum]) return;

    const user = input.value.trim().toLowerCase();
    const correctAns = answerKey[qNum].toLowerCase();

    if (user === correctAns) {
      correct++;
      input.style.border = "2px solid green";
    } else {
      input.style.border = "2px solid red";
    }
  });

  // CHECKBOX QUESTIONS
  document.querySelectorAll("div[data-question]").forEach(div => {
    const qNum = div.dataset.question;
    const correctAns = answerKey[qNum];
    if (!Array.isArray(correctAns)) return;

    const checked = [...div.querySelectorAll("input:checked")]
      .map(i => i.value)
      .sort();

    if (
      checked.length === correctAns.length &&
      checked.every((v, i) => v === correctAns.sort()[i])
    ) {
      correct++;
      div.style.border = "2px solid green";
    } else {
      div.style.border = "2px solid red";
    }
  });

  document.getElementById("result").innerHTML =
    `<h3>Correct answers: ${correct}</h3>`;
}