/* ===========================
   LOAD PASSAGE BY URL ID
=========================== */

const params = new URLSearchParams(window.location.search);
const passageId = params.get("id") || "p001";

const script = document.createElement("script");
script.src = `reading-data/${passageId}.js`;
script.onload = () => initReadingTest(readingData);
document.body.appendChild(script);

/* ===========================
   GLOBALS
=========================== */

let timerInterval;
let remainingSeconds = 0;
let userAnswers = {};

/* ===========================
   INIT TEST
=========================== */

function initReadingTest(data) {
  document.getElementById("testTitle").innerText = data.title;
  document.getElementById("passage").innerText = data.passage;

  renderQuestions(data.questions);
  startTimer(data.timeLimitMinutes);

  document.getElementById("submitBtn").onclick = () => submitTest(data);
}

/* ===========================
   TIMER
=========================== */

function startTimer(minutes) {
  remainingSeconds = minutes * 60;
  updateTimer();

  timerInterval = setInterval(() => {
    remainingSeconds--;
    updateTimer();

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      alert("Time is up!");
      submitTest(readingData);
    }
  }, 1000);
}

function updateTimer() {
  const min = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds % 60;
  document.getElementById("timer").innerText =
    `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

/* ===========================
   RENDER QUESTIONS
=========================== */

function renderQuestions(questions) {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";

    let html = `<p><b>${q.id}. ${q.text}</b></p>`;

    // Paragraph matching / summary (text input)
    if (q.type === "paragraph_matching" || q.type === "summary") {
      html += `
        <input type="text" 
               oninput="userAnswers[${q.id}] = this.value.trim()" 
               placeholder="Your answer" />
      `;
    }

    // Multiple choice
    if (q.type === "multiple_choice") {
      for (const key in q.options) {
        html += `
          <label>
            <input type="checkbox" 
                   value="${key}"
                   onchange="handleCheckbox(${q.id}, this)">
            ${key}. ${q.options[key]}
          </label><br/>
        `;
      }
    }

    div.innerHTML = html;
    container.appendChild(div);
  });
}

/* ===========================
   HANDLE MULTIPLE CHOICE
=========================== */

function handleCheckbox(qid, checkbox) {
  if (!userAnswers[qid]) userAnswers[qid] = [];

  if (checkbox.checked) {
    userAnswers[qid].push(checkbox.value);
  } else {
    userAnswers[qid] =
      userAnswers[qid].filter(v => v !== checkbox.value);
  }
}

/* ===========================
   SUBMIT & CHECK
=========================== */

function submitTest(data) {
  clearInterval(timerInterval);

  let correct = 0;
  let total = data.questions.length;

  const resultBox = document.getElementById("result");
  resultBox.innerHTML = "";

  data.questions.forEach(q => {
    const user = userAnswers[q.id];
    const answer = q.answer;

    let isCorrect = false;

    if (Array.isArray(answer)) {
      isCorrect =
        Array.isArray(user) &&
        answer.length === user.length &&
        answer.every(a => user.includes(a));
    } else {
      isCorrect =
        user &&
        user.toString().toLowerCase() ===
        answer.toString().toLowerCase();
    }

    if (isCorrect) correct++;

    resultBox.innerHTML += `
      <p>
        Q${q.id}: 
        <span style="color:${isCorrect ? "green" : "red"}">
          ${isCorrect ? "Correct" : "Wrong"}
        </span>
      </p>
    `;
  });

  const band = calculateBand(correct);

  resultBox.innerHTML += `
    <hr/>
    <h3>Score: ${correct} / ${total}</h3>
    <h2>IELTS Band: ${band}</h2>
  `;
}

/* ===========================
   BAND SCORE (IELTS ACADEMIC)
=========================== */

function calculateBand(score) {
  if (score >= 39) return 9;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8;
  if (score >= 33) return 7.5;
  if (score >= 30) return 7;
  if (score >= 27) return 6.5;
  if (score >= 23) return 6;
  if (score >= 19) return 5.5;
  if (score >= 15) return 5;
  if (score >= 13) return 4.5;
  if (score >= 10) return 4;
  return 3.5;
}

/* ===========================
   HIGHLIGHT TEXT
=========================== */

document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  if (range.toString().length > 0) {
    const span = document.createElement("span");
    span.style.backgroundColor = "yellow";
    range.surroundContents(span);
    selection.removeAllRanges();
  }
});