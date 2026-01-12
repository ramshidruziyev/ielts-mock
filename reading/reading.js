/* =====================================================
   IELTS READING – MAIN LOGIC (FINAL)
   Compatible with p001.js
   Works on GitHub Pages
===================================================== */

/* =====================
   GLOBAL STATE
===================== */
let data = null;
let score = 0;
let timer = null;
let timeLeft = 20 * 60;

/* =====================
   ELEMENTS
===================== */
const passageEl = document.getElementById("passage");
const questionsEl = document.getElementById("questions");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");

/* =====================
   INIT (CALLED FROM HTML)
===================== */
function initReading() {
  if (!window.readingData) {
    alert("Reading data yuklanmadi!");
    return;
  }

  data = window.readingData;

  renderPassage();
  renderQuestions();
  startTimer();
}

/* =====================
   RENDER PASSAGE
===================== */
function renderPassage() {
  passageEl.innerHTML = data.passage;
  enableHighlighting();
}

/* =====================
   RENDER QUESTIONS
===================== */
function renderQuestions() {
  questionsEl.innerHTML = "";

  data.questions.forEach((q, index) => {
    if (q.type === "paragraph" || q.type === "input") {
      renderSimpleQuestion(q, index);
    }

    if (q.type === "multi-group") {
      renderMultiGroup(q);
    }
  });
}

function renderSimpleQuestion(q, index) {
  const div = document.createElement("div");
  div.className = "question";
  div.dataset.id = q.id;

  let html = `<p><b>${q.id}.</b> ${q.text}</p>`;

  if (q.type === "input") {
    html += `<input type="text" />`;
  }

  if (q.type === "paragraph") {
    html += `<input type="text" placeholder="A–H" />`;
  }

  div.innerHTML = html;
  questionsEl.appendChild(div);
}

/* =====================
   MULTI GROUP (9–10, 11–13)
===================== */
function renderMultiGroup(group) {
  const wrapper = document.createElement("div");
  wrapper.className = "question-group";

  wrapper.innerHTML = `<p class="instruction">${group.instruction}</p>`;

  group.questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";
    div.dataset.id = q.id;
    div.dataset.limit = group.limit;

    let html = `<p><b>${q.id}.</b> ${q.text}</p>`;

    for (const key in q.options) {
      html += `
        <label>
          <input type="checkbox" value="${key}">
          ${key}. ${q.options[key]}
        </label><br>
      `;
    }

    div.innerHTML = html;
    wrapper.appendChild(div);
  });

  questionsEl.appendChild(wrapper);
}

/* =====================
   SUBMIT & SCORE
===================== */
function submitAnswers() {
  score = 0;

  document.querySelectorAll(".question").forEach(div => {
    const id = div.dataset.id;
    const q = findQuestionById(id);
    if (!q) return;

    div.classList.remove("correct", "wrong");

    if (q.type === "input" || q.type === "paragraph") {
      const user = div.querySelector("input").value.trim().toLowerCase();
      if (user === q.answer.toLowerCase()) {
        score++;
        div.classList.add("correct");
      } else {
        div.classList.add("wrong");
      }
    }

    if (Array.isArray(q.answer)) {
      const checked = [...div.querySelectorAll("input:checked")].map(i => i.value);
      const limit = Number(div.dataset.limit);

      if (
        checked.length === limit &&
        checked.every(v => q.answer.includes(v))
      ) {
        score++;
        div.classList.add("correct");
      } else {
        div.classList.add("wrong");
      }
    }
  });

  scoreEl.textContent = score;
}

/* =====================
   FIND QUESTION
===================== */
function findQuestionById(id) {
  for (const q of data.questions) {
    if (q.id == id) return q;
    if (q.type === "multi-group") {
      const found = q.questions.find(x => x.id == id);
      if (found) return found;
    }
  }
  return null;
}

/* =====================
   RESET
===================== */
function resetTest() {
  score = 0;
  scoreEl.textContent = "0";
  clearInterval(timer);
  timeLeft = data.time * 60;

  document.querySelectorAll("input").forEach(i => {
    i.checked = false;
    i.value = "";
  });

  document.querySelectorAll(".question").forEach(q => {
    q.classList.remove("correct", "wrong");
  });

  startTimer();
}

/* =====================
   TIMER
===================== */
function startTimer() {
  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timer);
      submitAnswers();
      alert("Time is up!");
    }
  }, 1000);
}

function updateTimer() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");
  timerEl.textContent = `${m}:${s}`;
}

/* =====================
   HIGHLIGHT
===================== */
function enableHighlighting() {
  passageEl.addEventListener("mouseup", () => {
    const sel = window.getSelection();
    if (!sel.toString()) return;

    const range = sel.getRangeAt(0);
    const span = document.createElement("span");
    span.className = "highlight";
    range.surroundContents(span);
    sel.removeAllRanges();
  });
}

/* =====================
   EVENTS
===================== */
submitBtn.addEventListener("click", submitAnswers);
resetBtn.addEventListener("click", resetTest);