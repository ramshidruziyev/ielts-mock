// ===============================
// IELTS READING ENGINE (FINAL)
// ===============================

// -------- GET TEST ID --------
const params = new URLSearchParams(window.location.search);
const testId = params.get("id") || "p001";

// -------- LOAD TEST DATA --------
const script = document.createElement("script");
script.src = `data/${testId}.js`;
script.onload = () => {
  if (!window.readingData) {
    alert("Reading data yuklanmadi!");
    return;
  }
  initReading(window.readingData);
};
script.onerror = () => alert("Test file topilmadi: " + testId);
document.body.appendChild(script);

// ===============================
// INIT
// ===============================
let score = 0;
let timerInterval;

function initReading(data) {
  renderPassage(data.passage);
  renderQuestions(data.questions);
  startTimer(data.time || 20);
  enableHighlight();
  document.getElementById("submitBtn").onclick = () => submitTest(data);
}

// ===============================
// RENDER PASSAGE
// ===============================
function renderPassage(html) {
  document.getElementById("passage").innerHTML = html;
}

// ===============================
// RENDER QUESTIONS
// ===============================
function renderQuestions(questions) {
  const box = document.getElementById("questions");
  box.innerHTML = "";

  questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question-box";
    div.dataset.id = q.id;

    if (q.type === "paragraph" || q.type === "input") {
      div.innerHTML = `
        <h4>${q.id}. ${q.text || ""}</h4>
        <input type="text" data-answer="${q.answer}">
      `;
    }

    if (q.type === "multi") {
      div.innerHTML = `<h4>${q.id}. ${q.text || ""}</h4>`;
      Object.entries(q.options || {}).forEach(([key, val]) => {
        div.innerHTML += `
          <label>
            <input type="checkbox" 
              name="q${q.id}" 
              value="${key}" 
              data-limit="${q.limit}">
            ${key}. ${val}
          </label>
        `;
      });
    }

    box.appendChild(div);
  });

  applyCheckboxLimits();
}

// ===============================
// CHECKBOX LIMIT (2 / 3)
// ===============================
function applyCheckboxLimits() {
  document.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", () => {
      const name = cb.name;
      const limit = parseInt(cb.dataset.limit);
      const checked = document.querySelectorAll(
        `input[name="${name}"]:checked`
      );
      if (checked.length > limit) cb.checked = false;
    });
  });
}

// ===============================
// TIMER
// ===============================
function startTimer(minutes) {
  let seconds = minutes * 60;
  const el = document.getElementById("timer");

  timerInterval = setInterval(() => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    el.textContent = `${m}:${s}`;

    if (seconds <= 0) {
      clearInterval(timerInterval);
      submitTest(window.readingData);
    }
    seconds--;
  }, 1000);
}

// ===============================
// SUBMIT + CHECK
// ===============================
function submitTest(data) {
  clearInterval(timerInterval);
  score = 0;

  data.questions.forEach(q => {
    const box = document.querySelector(`.question-box[data-id="${q.id}"]`);

    // TEXT / PARAGRAPH
    if (q.type === "paragraph" || q.type === "input") {
      const input = box.querySelector("input");
      const user = input.value.trim().toLowerCase();
      const correct = q.answer.toLowerCase();

      if (user === correct) {
        box.classList.add("correct");
        score++;
      } else {
        box.classList.add("wrong");
      }
    }

    // MULTI
    if (q.type === "multi") {
      const checked = [...box.querySelectorAll("input:checked")]
        .map(i => i.value)
        .sort()
        .join(",");
      const correct = q.answer.sort().join(",");

      if (checked === correct) {
        box.classList.add("correct");
        score++;
      } else {
        box.classList.add("wrong");
      }
    }
  });

  document.getElementById("score").textContent = score;
  saveResult(data.id, score, data.questions.length);
}

// ===============================
// SAVE RESULT
// ===============================
function saveResult(id, score, total) {
  const results = JSON.parse(localStorage.getItem("readingResults") || "[]");
  results.push({
    id,
    score,
    total,
    date: new Date().toISOString()
  });
  localStorage.setItem("readingResults", JSON.stringify(results));
}

// ===============================
// HIGHLIGHT (UNLIMITED)
// ===============================
function enableHighlight() {
  document.addEventListener("mouseup", () => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return;

    const range = sel.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement("span");
    span.className = "highlight";
    range.surroundContents(span);
    sel.removeAllRanges();
  });
}