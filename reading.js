/* ========= TIMER ========= */
let time = readingData.timeLimitMinutes * 60;
const timerEl = document.getElementById("timer");
const timer = setInterval(() => {
  time--;
  const m = Math.floor(time / 60);
  const s = time % 60;
  timerEl.innerText = `${m}:${s.toString().padStart(2,"0")}`;
  if (time <= 0) submitTest();
}, 1000);

/* ========= RENDER PASSAGE ========= */
document.getElementById("testTitle").innerText = readingData.title;
document.getElementById("passage").innerHTML = readingData.passage;

/* ========= HIGHLIGHT ========= */
document.getElementById("passage").addEventListener("mouseup", () => {
  const sel = window.getSelection();
  if (sel.toString()) {
    document.execCommand(
      "insertHTML",
      false,
      `<mark>${sel}</mark>`
    );
    sel.removeAllRanges();
  }
});

/* ========= RENDER QUESTIONS ========= */
const form = document.getElementById("questionForm");

readingData.questions.forEach(q => {
  let html = `<p><b>${q.id}.</b> ${q.text}</p>`;

  if (q.options) {
    Object.keys(q.options).forEach(k => {
      html += `
      <label>
        <input type="checkbox" name="q${q.id}" value="${k}">
        ${k}. ${q.options[k]}
      </label><br>`;
    });
  } else {
    html += `<input type="text" name="q${q.id}" placeholder="Your answer">`;
  }

  form.innerHTML += html + "<hr>";
});

/* ========= SUBMIT + SCORE ========= */
document.getElementById("submitBtn").onclick = submitTest;

function submitTest() {
  clearInterval(timer);
  let correct = 0;

  readingData.questions.forEach(q => {
    if (Array.isArray(q.answer)) {
      const checked = [...document.querySelectorAll(`input[name=q${q.id}]:checked`)]
        .map(i => i.value)
        .sort()
        .join(",");
      if (checked === q.answer.sort().join(",")) correct++;
    } else {
      const input = document.querySelector(`input[name=q${q.id}]`);
      if (input && input.value.trim().toLowerCase() === q.answer.toLowerCase())
        correct++;
    }
  });

  const band = calcBand(correct, readingData.questions.length);

  document.getElementById("result").innerHTML = `
    <h3>Result</h3>
    <p>Correct answers: ${correct} / ${readingData.questions.length}</p>
    <p><b>Estimated IELTS Band: ${band}</b></p>
  `;
}

/* ========= BAND CALCULATOR ========= */
function calcBand(score, total) {
  const percent = score / total;
  if (percent >= 0.9) return 9;
  if (percent >= 0.85) return 8.5;
  if (percent >= 0.8) return 8;
  if (percent >= 0.7) return 7;
  if (percent >= 0.6) return 6.5;
  if (percent >= 0.5) return 6;
  return 5.5;
}