// =====================================================
// IELTS READING – MAIN LOGIC (GitHub Pages compatible)
// =====================================================

// ---------- GET TEST ID ----------
const params = new URLSearchParams(window.location.search);
const testId = params.get("id");

if (!testId) {
  alert("Reading test ID topilmadi");
  throw new Error("No test id");
}

// ---------- LOAD DATA FILE (p001.js, p002.js ...) ----------
const dataScript = document.createElement("script");
dataScript.src = `data/${testId}.js`;
dataScript.onload = () => {
  if (!window.readingData) {
    alert("Reading data yuklanmadi");
    return;
  }
  initReading(window.readingData);
};
document.body.appendChild(dataScript);

// =====================================================
// INIT READING
// =====================================================
let score = 0;
let timerInterval;
let timeLeft = 0;

function initReading(data) {
  document.getElementById("test-title").innerText = data.title;
  document.getElementById("passage").innerHTML = data.passage;

  renderQuestions(data.questions);
  startTimer(data.time);
  enableHighlight();
}

// =====================================================
// RENDER QUESTIONS
// =====================================================
function renderQuestions(questions) {
  const qBox = document.getElementById("questions");
  qBox.innerHTML = "";

  questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";

    let html = `<p><b>${q.id}.</b> ${q.text}</p>`;

    // PARAGRAPH MATCH
    if (q.type === "paragraph") {
      html += `<input type="text" data-id="${q.id}" class="answer-input" />`;
    }

    // INPUT (ONE WORD)
    if (q.type === "input") {
      html += `<input type="text" data-id="${q.id}" class="answer-input" />`;
    }

    // MULTIPLE CHOICE (LIMITED)
    if (q.type === "multi") {
      Object.keys(q.options).forEach(k => {
        html += `
          <label>
            <input type="checkbox"
              name="q${q.id}"
              value="${k}"
              data-limit="${q.limit}">
            ${k}. ${q.options[k]}
          </label><br>
        `;
      });
    }

    div.innerHTML = html;
    qBox.appendChild(div);
  });

  applyCheckboxLimits();
}

// =====================================================
// CHECKBOX LIMIT
// =====================================================
function applyCheckboxLimits() {
  document.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", () => {
      const name = cb.name;
      const limit = parseInt(cb.dataset.limit);
      const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
      if (checked.length > limit) cb.checked = false;
    });
  });
}

// =====================================================
// SUBMIT ANSWERS
// =====================================================
document.getElementById("submitBtn").addEventListener("click", () => {
  score = 0;
  const data = window.readingData;

  data.questions.forEach(q => {
    // TEXT INPUT
    if (q.type === "input" || q.type === "paragraph") {
      const input = document.querySelector(`input[data-id="${q.id}"]`);
      if (
        input &&
        input.value.trim().toLowerCase() === q.answer.toLowerCase()
      ) {
        score++;
        input.classList.add("correct");
      } else if (input) {
        input.classList.add("wrong");
      }
    }

    // MULTI
    if (q.type === "multi") {
      const checked = Array.from(
        document.querySelectorAll(`input[name="q${q.id}"]:checked`)
      ).map(i => i.value);

      const correct =
        checked.length === q.answer.length &&
        checked.every(v => q.answer.includes(v));

      if (correct) score++;

      checked.forEach(v => {
        const el = document.querySelector(
          `input[name="q${q.id}"][value="${v}"]`
        );
        el.parentElement.style.color = correct ? "green" : "red";
      });
    }
  });

  document.getElementById("score").innerText = score;
  clearInterval(timerInterval);
});

// =====================================================
// TIMER (20:00)
// =====================================================
function startTimer(minutes) {
  timeLeft = minutes * 60;
  updateTimer();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Time is up!");
    }
  }, 1000);
}

function updateTimer() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  document.getElementById("timer").innerText =
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// =====================================================
// TEXT HIGHLIGHT (SELECTION)
// =====================================================
function enableHighlight() {
  document.getElementById("passage").addEventListener("mouseup", () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.className = "highlight";
    range.surroundContents(span);
    selection.removeAllRanges();
  });
}