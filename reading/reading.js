/* =====================================================
   IELTS READING – MAIN LOGIC (FINAL, IELTS UX)
   p001.js & p002.js compatible
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

// MODAL ELEMENTS (reading.html dan)
const resultModal = document.getElementById("resultModal");
const resultScore = document.getElementById("resultScore");
const closeResult = document.getElementById("closeResult");
const reviewFromResult = document.getElementById("reviewFromResult");

/* =====================
   INIT (WAIT FOR DATA)
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
   QUESTIONS RENDER
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
   SUBMIT (ONLY SCORE)
===================== */
function submitAnswers() {
  score = 0;

  document.querySelectorAll(".question").forEach(div => {
    const q = findQuestion(div.dataset.id);
    if (!q) return;

    if (q.type === "input" || q.type === "paragraph") {
      const user = div.querySelector("input").value.trim().toLowerCase();
      if (user === q.answer.toLowerCase()) score++;
    }

    if (q.type === "tfng") {
      const r = div.querySelector("input:checked");
      if (r && r.value === q.answer) score++;
    }

    if (Array.isArray(q.answer)) {
      const checked = [...div.querySelectorAll("input:checked")].map(i => i.value);
      if (
        checked.length === q.answer.length &&
        checked.every(v => q.answer.includes(v))
      ) score++;
    }
  });

  resultScore.textContent = `${score} / ${data.questions.length}`;
  resultModal.classList.remove("hidden");
}

/* =====================
   REVIEW ANSWERS
===================== */
function reviewAnswers() {
  resultModal.classList.add("hidden");

  document.querySelectorAll(".question").forEach(div => {
    const q = findQuestion(div.dataset.id);
    if (!q) return;

    div.querySelectorAll("input").forEach(i => i.disabled = true);

    let correct = false;

    if (q.type === "input" || q.type === "paragraph") {
      const user = div.querySelector("input").value.trim().toLowerCase();
      correct = user === q.answer.toLowerCase();
    }

    if (q.type === "tfng") {
      const r = div.querySelector("input:checked");
      correct = r && r.value === q.answer;
    }

    if (Array.isArray(q.answer)) {
      const checked = [...div.querySelectorAll("input:checked")].map(i => i.value);
      correct =
        checked.length === q.answer.length &&
        checked.every(v => q.answer.includes(v));
    }

    div.classList.add(correct ? "correct" : "wrong");
    addMark(div, correct, q.answer);
  });
}

function addMark(div, ok, ans) {
  if (div.querySelector(".answer-mark")) return;

  const d = document.createElement("div");
  d.className = "answer-mark";
  d.innerHTML = ok
    ? "✅ Correct"
    : `❌ Incorrect<br><small>Correct: ${Array.isArray(ans) ? ans.join(", ") : ans}</small>`;
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
    if (timeLeft <= 0) submitAnswers();
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
closeResult.addEventListener("click", () => resultModal.classList.add("hidden"));
reviewFromResult.addEventListener("click", reviewAnswers);

/* =====================
   START
===================== */
initReading();