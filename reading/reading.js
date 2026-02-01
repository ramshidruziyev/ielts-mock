/* =====================================================
   IELTS READING – MAIN LOGIC (FINAL, PRO)
   Compatible with p001.js & p002.js
   GitHub Pages safe
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
const reviewBtn = document.getElementById("reviewBtn");

/* =====================
   INIT (SAFE – WAIT FOR DATA)
===================== */
function initReading() {
  if (!window.readingData) {
    setTimeout(initReading, 50);
    return;
  }

  data = window.readingData;
  timeLeft = data.time * 60;

  renderPassage();
  renderQuestions();
  startTimer();
}

/* =====================
   PASSAGE + HIGHLIGHT
===================== */
function renderPassage() {
  passageEl.innerHTML = data.passage;
  enableHighlighting();
}

/* =====================
   QUESTIONS
===================== */
function renderQuestions() {
  questionsEl.innerHTML = "";

  data.questions.forEach(q => {
    if (q.type === "instruction") {
      const d = document.createElement("div");
      d.className = "instruction";
      d.innerHTML = `<pre>${q.text}</pre>`;
      questionsEl.appendChild(d);
      return;
    }

    if (q.type === "input" || q.type === "paragraph") {
      renderSimple(q);
      return;
    }

    if (q.type === "tfng") {
      renderTFNG(q);
      return;
    }

    if (q.type === "multi-group") {
      renderMultiGroup(q);
      return;
    }
  });
}

function renderSimple(q) {
  const d = document.createElement("div");
  d.className = "question";
  d.dataset.id = q.id;

  d.innerHTML = `
    <p><b>${q.id}.</b> ${q.text}</p>
    <input type="text" ${q.type === "paragraph" ? 'placeholder="A–H"' : ""}>
  `;
  questionsEl.appendChild(d);
}

function renderTFNG(q) {
  const d = document.createElement("div");
  d.className = "question";
  d.dataset.id = q.id;

  d.innerHTML = `
    <p><b>${q.id}.</b> ${q.text}</p>
    <label><input type="radio" name="q${q.id}" value="TRUE"> TRUE</label><br>
    <label><input type="radio" name="q${q.id}" value="FALSE"> FALSE</label><br>
    <label><input type="radio" name="q${q.id}" value="NOT GIVEN"> NOT GIVEN</label>
  `;
  questionsEl.appendChild(d);
}

function renderMultiGroup(group) {
  const wrap = document.createElement("div");
  wrap.className = "question-group";
  wrap.innerHTML = `<p class="instruction">${group.instruction}</p>`;

  group.questions.forEach(q => {
    const d = document.createElement("div");
    d.className = "question";
    d.dataset.id = q.id;
    d.dataset.limit = group.limit;

    let html = `<p><b>${q.id}.</b> ${q.text}</p>`;
    for (const k in q.options) {
      html += `
        <label>
          <input type="checkbox" value="${k}">
          ${k}. ${q.options[k]}
        </label><br>
      `;
    }

    d.innerHTML = html;
    wrap.appendChild(d);
  });

  questionsEl.appendChild(wrap);
}

/* =====================
   CHECKBOX LIMIT
===================== */
document.addEventListener("change", e => {
  if (e.target.type !== "checkbox") return;
  const q = e.target.closest(".question");
  if (!q) return;

  const limit = Number(q.dataset.limit);
  if (!limit) return;

  const checked = q.querySelectorAll("input[type=checkbox]:checked");
  if (checked.length > limit) e.target.checked = false;
});

/* =====================
   SUBMIT
===================== */
function submitAnswers() {
  score = 0;

  document.querySelectorAll(".question").forEach(div => {
    const id = div.dataset.id;
    const q = findQuestion(id);
    if (!q) return;

    div.classList.remove("correct", "wrong");

    // INPUT / PARAGRAPH
    if (q.type === "input" || q.type === "paragraph") {
      const inp = div.querySelector("input");
      const user = inp.value.trim().toLowerCase();
      if (user === q.answer.toLowerCase()) {
        score++;
        div.classList.add("correct");
      } else {
        div.classList.add("wrong");
      }
    }

    // TFNG
    if (q.type === "tfng") {
      const r = div.querySelector("input:checked");
      if (r && r.value === q.answer) {
        score++;
        div.classList.add("correct");
      } else {
        div.classList.add("wrong");
      }
    }

    // MULTI
    if (Array.isArray(q.answer)) {
      const checked = [...div.querySelectorAll("input:checked")].map(i => i.value);
      if (
        checked.length === q.answer.length &&
        checked.every(v => q.answer.includes(v))
      ) {
        score++;
        div.classList.add("correct");
      } else {
        div.classList.add("wrong");
      }
    }
  });

  scoreEl.textContent = `${score} / ${data.questions.length}`;
}

/* =====================
   REVIEW ANSWERS
===================== */
function reviewAnswers() {
  document.querySelectorAll(".question").forEach(div => {
    const id = div.dataset.id;
    const q = findQuestion(id);
    if (!q) return;

    div.querySelectorAll("input").forEach(i => i.disabled = true);

    if (div.classList.contains("correct")) {
      addMark(div, true);
    } else {
      addMark(div, false, q.answer);
    }
  });
}

function addMark(div, ok, answer = "") {
  if (div.querySelector(".answer-mark")) return;

  const d = document.createElement("div");
  d.className = "answer-mark";
  d.innerHTML = ok
    ? "✅ Correct"
    : `❌ Incorrect<br><small>Correct: ${Array.isArray(answer) ? answer.join(", ") : answer}</small>`;
  div.appendChild(d);
}

/* =====================
   FIND QUESTION
===================== */
function findQuestion(id) {
  for (const q of data.questions) {
    if (q.id == id) return q;
    if (q.type === "multi-group") {
      const f = q.questions.find(x => x.id == id);
      if (f) return f;
    }
  }
  return null;
}

/* =====================
   RESET
===================== */
function resetTest() {
  clearInterval(timer);
  score = 0;
  scoreEl.textContent = "0";

  document.querySelectorAll("input").forEach(i => {
    i.disabled = false;
    i.checked = false;
    i.value = "";
  });

  document.querySelectorAll(".question").forEach(q => {
    q.classList.remove("correct", "wrong");
    const m = q.querySelector(".answer-mark");
    if (m) m.remove();
  });

  timeLeft = data.time * 60;
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
    if (!sel || !sel.toString()) return;
    try {
      const r = sel.getRangeAt(0);
      if (!passageEl.contains(r.commonAncestorContainer)) return;
      const s = document.createElement("span");
      s.className = "highlight";
      r.surroundContents(s);
      sel.removeAllRanges();
    } catch {
      sel.removeAllRanges();
    }
  });
}

/* =====================
   EVENTS
===================== */
submitBtn.addEventListener("click", submitAnswers);
resetBtn.addEventListener("click", resetTest);
reviewBtn.addEventListener("click", reviewAnswers);

/* =====================
   START
===================== */
initReading();