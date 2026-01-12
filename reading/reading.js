/* =====================================================
   IELTS READING – MAIN LOGIC
   Ishlaydi: GitHub Pages
===================================================== */

/* =====================
   GLOBAL STATE
===================== */
let testData = null;
let score = 0;
let timerSeconds = 20 * 60;
let timerInterval = null;

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
   GET TEST ID
===================== */
const params = new URLSearchParams(window.location.search);
const testId = params.get("id") || "p001";

/* =====================
   LOAD TEST DATA
===================== */
function loadTestData() {
  const script = document.createElement("script");
  script.src = `data/${testId}.js`;

  script.onload = () => {
    if (!window.READING_TEST) {
      alert("Reading data yuklanmadi!");
      return;
    }

    testData = window.READING_TEST;
    renderPassage();
    renderQuestions();
    startTimer();
  };

  script.onerror = () => {
    alert("Reading data yuklanmadi!");
  };

  document.body.appendChild(script);
}

/* =====================
   RENDER PASSAGE
===================== */
function renderPassage() {
  passageEl.innerHTML = "";

  testData.passage.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    passageEl.appendChild(p);
  });

  enableHighlighting();
}

/* =====================
   RENDER QUESTIONS
===================== */
function renderQuestions() {
  questionsEl.innerHTML = "";

  testData.questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";
    div.dataset.index = index;

    let html = `<p><b>${index + 1}.</b> ${q.question}</p>`;

    if (q.type === "text") {
      html += `<input type="text" />`;
    }

    if (q.type === "boolean") {
      q.options.forEach(opt => {
        html += `
          <label>
            <input type="radio" name="q${index}" value="${opt}">
            ${opt}
          </label>
        `;
      });
    }

    if (q.type === "multiple") {
      q.options.forEach(opt => {
        html += `
          <label>
            <input type="checkbox" value="${opt}">
            ${opt}
          </label>
        `;
      });
    }

    div.innerHTML = html;
    questionsEl.appendChild(div);
  });
}

/* =====================
   SUBMIT & CHECK
===================== */
function submitAnswers() {
  score = 0;

  const questionDivs = document.querySelectorAll(".question");

  questionDivs.forEach((div, i) => {
    const q = testData.questions[i];
    div.classList.remove("correct", "wrong");

    let userAnswer = null;

    if (q.type === "text") {
      userAnswer = div.querySelector("input").value.trim().toLowerCase();
      if (userAnswer === q.answer.toLowerCase()) {
        score++;
        div.classList.add("correct");
      } else {
        div.classList.add("wrong");
      }
    }

    if (q.type === "boolean") {
      const checked = div.querySelector("input:checked");
      if (checked && checked.value === q.answer) {
        score++;
        div.classList.add("correct");
      } else {
        div.classList.add("wrong");
      }
    }

    if (q.type === "multiple") {
      const checked = [...div.querySelectorAll("input:checked")].map(
        c => c.value
      );

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

  scoreEl.textContent = score;
}

/* =====================
   RESET
===================== */
function resetTest() {
  score = 0;
  scoreEl.textContent = 0;
  clearInterval(timerInterval);
  timerSeconds = 20 * 60;

  document.querySelectorAll(".question").forEach(q => {
    q.classList.remove("correct", "wrong");
    q.querySelectorAll("input").forEach(i => {
      i.checked = false;
      i.value = "";
    });
  });

  startTimer();
}

/* =====================
   TIMER
===================== */
function startTimer() {
  updateTimer();

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimer();

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      submitAnswers();
      alert("Time is up!");
    }
  }, 1000);
}

function updateTimer() {
  const min = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const sec = String(timerSeconds % 60).padStart(2, "0");
  timerEl.textContent = `${min}:${sec}`;
}

/* =====================
   TEXT HIGHLIGHT
===================== */
function enableHighlighting() {
  passageEl.addEventListener("mouseup", () => {
    const selection = window.getSelection();
    if (!selection.toString()) return;

    const span = document.createElement("span");
    span.className = "highlight";
    selection.getRangeAt(0).surroundContents(span);
    selection.removeAllRanges();
  });
}

/* =====================
   EVENTS
===================== */
submitBtn.addEventListener("click", submitAnswers);
resetBtn.addEventListener("click", resetTest);

/* =====================
   INIT
===================== */
loadTestData();