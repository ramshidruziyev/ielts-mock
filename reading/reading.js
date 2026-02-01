/* =====================================================
   IELTS READING – MAIN LOGIC (FINAL, EXTENDED)
   Compatible with p001.js AND p002.js
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
   INIT
===================== */
function initReading() {
  if (!window.readingData) {
    alert("Reading data yuklanmadi!");
    return;
  }

  data = window.readingData;
  timeLeft = data.time * 60;

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

  data.questions.forEach(q => {

    /* ---------- INSTRUCTION ---------- */
    if (q.type === "instruction") {
      const div = document.createElement("div");
      div.className = "instruction";
      div.innerHTML = `<pre>${q.text}</pre>`;
      questionsEl.appendChild(div);
      return;
    }

    /* ---------- SIMPLE (INPUT / PARAGRAPH) ---------- */
    if (q.type === "input" || q.type === "paragraph") {
      renderSimpleQuestion(q);
      return;
    }

    /* ---------- TRUE / FALSE / NOT GIVEN ---------- */
    if (q.type === "tfng") {
      renderTFNG(q);
      return;
    }

    /* ---------- MULTI GROUP ---------- */
    if (q.type === "multi-group") {
      renderMultiGroup(q);
      return;
    }
  });
}

/* =====================
   SIMPLE QUESTION
===================== */
function renderSimpleQuestion(q) {
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
   TFNG (8–13)
===================== */
function renderTFNG(q) {
  const div = document.createElement("div");
  div.className = "question";
  div.dataset.id = q.id;

  div.innerHTML = `
    <p><b>${q.id}.</b> ${q.text}</p>
    <label><input type="radio" name="q${q.id}" value="TRUE"> TRUE</label><br>
    <label><input type="radio" name="q${q.id}" value="FALSE"> FALSE</label><br>
    <label><input type="radio" name="q${q.id}" value="NOT GIVEN"> NOT GIVEN</label>
  `;

  questionsEl.appendChild(div);
}

/* =====================
   MULTI GROUP
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
   CHECKBOX LIMIT
===================== */
document.addEventListener("change", e => {
  if (e.target.type !== "checkbox") return;

  const question = e.target.closest(".question");
  if (!question) return;

  const limit = Number(question.dataset.limit);
  if (!limit) return;

  const checked = question.querySelectorAll("input[type=checkbox]:checked");
  if (checked.length > limit) {
    e.target.checked = false;
  }
});

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

    /* INPUT / PARAGRAPH */
    if (q.type === "input" || q.type === "paragraph") {
      const user = div.querySelector("input").value.trim().toLowerCase();
      if (user === q.answer.toLowerCase()) {
        score++;
        div.classList.add("correct");
      } else {
        div.classList.add("wrong");
      }
    }

    /* TFNG */
    if (q.type === "tfng") {
      const checked = div.querySelector("input:checked");
      if (checked && checked.value === q.answer) {
        score++;
        div.classList.add("correct");
      } else {
        div.classList.add("wrong");
      }
    }

    /* MULTI */
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
   SAFE HIGHLIGHT
===================== */
function enableHighlighting() {
  passageEl.addEventListener("mouseup", () => {
    const sel = window.getSelection();
    if (!sel || !sel.toString()) return;

    try {
      const range = sel.getRangeAt(0);
      if (!passageEl.contains(range.commonAncestorContainer)) return;

      const span = document.createElement("span");
      span.className = "highlight";
      range.surroundContents(span);
      sel.removeAllRanges();
    } catch (e) {
      sel.removeAllRanges();
    }
  });
}

/* =====================
   EVENTS
===================== */
submitBtn.addEventListener("click", submitAnswers);
resetBtn.addEventListener("click", resetTest);

/* =====================
   AUTO INIT
===================== */
initReading();