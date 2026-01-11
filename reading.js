/*********************************
 * IELTS READING MAIN ENGINE
 *********************************/

let readingData = null;
let userAnswers = {};
let timerInterval = null;
let remainingSeconds = 0;

/* ===============================
   LOAD TEST BY ID (?id=p001)
================================ */
function getTestId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "p001";
}

function loadReadingData() {
  const testId = getTestId();

  const script = document.createElement("script");
  script.src = `reading-data/${testId}.js`;
  script.onload = () => {
    initTest();
  };
  script.onerror = () => {
    document.getElementById("passage").innerHTML =
      "❌ Passage not found.";
  };
  document.body.appendChild(script);
}

/* ===============================
   INIT TEST
================================ */
function initTest() {
  document.getElementById("testTitle").innerText = readingData.title;
  document.getElementById("passage").innerHTML = enableHighlight(readingData.passage);
  renderQuestions();
  startTimer(readingData.timeLimitMinutes);
}

/* ===============================
   TIMER
================================ */
function startTimer(minutes) {
  remainingSeconds = minutes * 60;
  updateTimer();

  timerInterval = setInterval(() => {
    remainingSeconds--;
    updateTimer();

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      submitAnswers();
    }
  }, 1000);
}

function updateTimer() {
  const min = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const sec = String(remainingSeconds % 60).padStart(2, "0");
  document.getElementById("timer").innerText = `${min}:${sec}`;
}

/* ===============================
   RENDER QUESTIONS
================================ */
function renderQuestions() {
  const qBox = document.getElementById("questions");
  qBox.innerHTML = "";

  readingData.questions.forEach((q) => {
    const div = document.createElement("div");
    div.className = "question";

    if (q.type === "paragraph_matching") {
      div.innerHTML = `
        <h4>${q.id}. ${q.text}</h4>
        <input type="text" maxlength="1"
          oninput="saveAnswer(${q.id}, this.value.toUpperCase())"
          placeholder="A-G"/>
      `;
    }

    if (q.type === "summary") {
      div.innerHTML = `
        <h4>${q.id}. ${q.text}</h4>
        <input type="text"
          oninput="saveAnswer(${q.id}, this.value.trim())"/>
      `;
    }

    if (q.type === "multiple_choice") {
      let optionsHTML = "";
      for (const key in q.options) {
        optionsHTML += `
          <label>
            <input type="checkbox"
              onchange="toggleOption(${q.id}, '${key}')"/>
            ${key}. ${q.options[key]}
          </label><br/>
        `;
      }

      div.innerHTML = `
        <h4>${q.id}. ${q.text}</h4>
        ${optionsHTML}
      `;
    }

    qBox.appendChild(div);
  });
}

/* ===============================
   SAVE ANSWERS
================================ */
function saveAnswer(id, value) {
  userAnswers[id] = value;
}

function toggleOption(id, option) {
  if (!userAnswers[id]) userAnswers[id] = [];
  if (userAnswers[id].includes(option)) {
    userAnswers[id] = userAnswers[id].filter(o => o !== option);
  } else {
    userAnswers[id].push(option);
  }
}

/* ===============================
   SUBMIT & CHECK
================================ */
document.getElementById("submitBtn").addEventListener("click", submitAnswers);

function submitAnswers() {
  clearInterval(timerInterval);

  let correct = 0;
  let total = readingData.questions.length;

  readingData.questions.forEach(q => {
    const user = userAnswers[q.id];

    if (Array.isArray(q.answer)) {
      if (
        Array.isArray(user) &&
        user.length === q.answer.length &&
        user.every(a => q.answer.includes(a))
      ) correct++;
    } else {
      if (
        user &&
        user.toString().toLowerCase() === q.answer.toString().toLowerCase()
      ) correct++;
    }
  });

  showResult(correct, total);
}

/* ===============================
   SCORE + BAND
================================ */
function showResult(correct, total) {
  const score = correct;
  const band = calculateBand(score);

  const box = document.getElementById("result");
  box.style.display = "block";
  box.innerHTML = `
    <h3>✅ Result</h3>
    <p>Correct answers: <b>${correct} / ${total}</b></p>
    <p>Estimated IELTS Band: <b>${band}</b></p>
  `;
}

function calculateBand(score) {
  if (score <= 5) return "5.0";
  if (score <= 7) return "5.5";
  if (score <= 9) return "6.0";
  if (score <= 11) return "6.5";
  if (score <= 13) return "7.0";
  if (score <= 15) return "7.5";
  return "8.0+";
}

/* ===============================
   TEXT HIGHLIGHT
================================ */
function enableHighlight(text) {
  return `
    <div onmouseup="highlightSelection()">
      ${text.replace(/\n/g, "<br>")}
    </div>
  `;
}

function highlightSelection() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.className = "highlight";
  range.surroundContents(span);
  selection.removeAllRanges();
}

/* ===============================
   START
================================ */
loadReadingData();