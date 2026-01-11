// =====================
// GLOBAL STATE
// =====================
let currentTest = null;
let userAnswers = {};
let timerInterval = null;
let remainingSeconds = 0;

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
  renderReadingList();
});

// =====================
// RENDER READING LIST
// =====================
function renderReadingList() {
  const listDiv = document.getElementById("readingList");
  if (!listDiv) return;

  listDiv.innerHTML = "";

  window.READING_INDEX.forEach(test => {
    const card = document.createElement("div");
    card.className = "reading-card";
    card.innerHTML = `
      <h3>${test.title}</h3>
      <button onclick="startTest('${test.id}')">▶ Start</button>
    `;
    listDiv.appendChild(card);
  });
}

// =====================
// START TEST
// =====================
function startTest(testId) {
  document.getElementById("readingList").style.display = "none";
  document.getElementById("testView").style.display = "block";

  loadTestData(testId);
}

// =====================
// LOAD TEST DATA
// =====================
function loadTestData(testId) {
  const script = document.createElement("script");
  script.src = `reading-data/${testId}.js`;
  script.onload = () => {
    currentTest = window.READING_TEST;
    renderTest();
    startTimer(currentTest.timeLimit);
  };
  document.body.appendChild(script);
}

// =====================
// RENDER TEST
// =====================
function renderTest() {
  document.getElementById("testTitle").innerText = currentTest.title;

  renderInstructions();
  renderPassage();
  renderQuestions();

  document.getElementById("submitBtn").onclick = submitTest;
}

// =====================
// INSTRUCTIONS
// =====================
function renderInstructions() {
  const div = document.getElementById("instructions");
  div.innerHTML = "";

  currentTest.instructions.forEach(text => {
    const p = document.createElement("p");
    p.className = "instruction";
    p.innerText = text;
    div.appendChild(p);
  });
}

// =====================
// PASSAGE (A, B, C…)
// =====================
function renderPassage() {
  const div = document.getElementById("passage");
  div.innerHTML = "";

  currentTest.passage.forEach(p => {
    const block = document.createElement("div");
    block.className = "paragraph";
    block.innerHTML = `<strong>${p.label}</strong><br>${p.text}`;
    div.appendChild(block);
  });
}

// =====================
// QUESTIONS
// =====================
function renderQuestions() {
  const div = document.getElementById("questions");
  div.innerHTML = "";

  currentTest.questions.forEach(q => {
    const qDiv = document.createElement("div");
    qDiv.className = "question";

    let html = `<p><strong>${q.id}. ${q.question}</strong></p>`;

    if (q.type === "tfng") {
      html += renderRadio(q.id, ["TRUE", "FALSE", "NOT GIVEN"]);
    }

    if (q.type === "paragraph") {
      html += renderRadio(
        q.id,
        currentTest.passage.map(p => p.label)
      );
    }

    if (q.type === "gap") {
      html += `<input type="text" oninput="saveAnswer(${q.id}, this.value)" />`;
    }

    qDiv.innerHTML = html;
    div.appendChild(qDiv);
  });
}

// =====================
// RADIO OPTIONS
// =====================
function renderRadio(qId, options) {
  return options
    .map(
      opt => `
    <label>
      <input type="radio" name="q${qId}" value="${opt}"
        onchange="saveAnswer(${qId}, '${opt}')">
      ${opt}
    </label><br>
  `
    )
    .join("");
}

// =====================
// SAVE ANSWER
// =====================
function saveAnswer(qId, value) {
  userAnswers[qId] = value.trim().toUpperCase();
}

// =====================
// TIMER
// =====================
function startTimer(minutes) {
  remainingSeconds = minutes * 60;
  updateTimer();

  timerInterval = setInterval(() => {
    remainingSeconds--;
    updateTimer();

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      submitTest();
    }
  }, 1000);
}

function updateTimer() {
  const m = Math.floor(remainingSeconds / 60);
  const s = remainingSeconds % 60;
  document.getElementById("timer").innerText =
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// =====================
// SUBMIT & CHECK
// =====================
function submitTest() {
  clearInterval(timerInterval);

  let correct = 0;

  currentTest.questions.forEach(q => {
    const user = (userAnswers[q.id] || "").toUpperCase();
    const correctAns = q.answer.toUpperCase();

    if (user === correctAns) correct++;
  });

  const total = currentTest.questions.length;
  const band = calculateBand(correct, total);

  document.getElementById("result").innerHTML = `
    <h3>Result</h3>
    <p>Score: ${correct} / ${total}</p>
    <p><strong>Band: ${band}</strong></p>
  `;
}

// =====================
// BAND CALCULATION
// =====================
function calculateBand(score, total) {
  const ratio = score / total;

  if (ratio >= 0.9) return 9;
  if (ratio >= 0.8) return 8;
  if (ratio >= 0.7) return 7;
  if (ratio >= 0.6) return 6;
  if (ratio >= 0.5) return 5;
  return 4;
}