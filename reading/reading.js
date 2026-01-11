const passageDiv = document.getElementById("passage");
const questionsDiv = document.getElementById("questions");
const titleEl = document.getElementById("testTitle");
const timerEl = document.getElementById("timer");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

let userAnswers = {};
let timerInterval;
let remainingSeconds = 1200;

// GET TEST ID
const params = new URLSearchParams(window.location.search);
const testId = params.get("id") || "p001";

// LOAD TEST FILE
const script = document.createElement("script");
script.src = `data/${testId}.js`;
script.onload = initTest;
script.onerror = () => {
  passageDiv.innerHTML = "❌ Test not found";
};
document.body.appendChild(script);

function initTest() {
  titleEl.textContent = readingData.title;

  renderPassage(readingData.passage);
  renderQuestions(readingData.questions);
  startTimer(readingData.timeLimitMinutes * 60);
}

function renderPassage(text) {
  passageDiv.innerHTML = "";
  text.trim().split("\n\n").forEach(p => {
    const el = document.createElement("p");
    el.textContent = p.trim();
    passageDiv.appendChild(el);
  });
}

function renderQuestions(questions) {
  questionsDiv.innerHTML = "";

  questions.forEach((group, gi) => {
    const block = document.createElement("div");
    block.className = "question-block";

    const inst = document.createElement("p");
    inst.innerText = group.instruction;
    block.appendChild(inst);

    group.list.forEach((q, qi) => {
      const id = `${gi}-${qi}`;

      const qEl = document.createElement("h4");
      qEl.textContent = `${qi + 1}. ${q.q}`;
      block.appendChild(qEl);

      if (group.type === "tfng") {
        ["TRUE", "FALSE", "NOT GIVEN"].forEach(opt => {
          const label = document.createElement("label");
          label.innerHTML = `
            <input type="radio" name="${id}" value="${opt}">
            ${opt}
          `;
          block.appendChild(label);
        });
      }

      if (group.type === "fill") {
        const input = document.createElement("input");
        input.type = "text";
        input.oninput = e => userAnswers[id] = e.target.value.trim().toLowerCase();
        block.appendChild(input);
      }

      userAnswers[id] = "";
    });

    questionsDiv.appendChild(block);
  });
}

submitBtn.onclick = submitAnswers;

function submitAnswers() {
  let score = 0;
  let total = 0;

  readingData.questions.forEach((group, gi) => {
    group.list.forEach((q, qi) => {
      const id = `${gi}-${qi}`;
      total++;

      if (group.type === "tfng") {
        const checked = document.querySelector(`input[name="${id}"]:checked`);
        if (checked && checked.value === q.answer) score++;
      }

      if (group.type === "fill") {
        if (userAnswers[id] === q.answer.toLowerCase()) score++;
      }
    });
  });

  resultDiv.textContent = `Score: ${score} / ${total}`;
  clearInterval(timerInterval);
}

function startTimer(seconds) {
  remainingSeconds = seconds;
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
  const m = Math.floor(remainingSeconds / 60);
  const s = remainingSeconds % 60;
  timerEl.textContent = `${m}:${s.toString().padStart(2, "0")}`;
}