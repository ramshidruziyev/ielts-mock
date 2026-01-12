/***********************
 * GLOBAL VARIABLES
 ***********************/
let timeLeft = 20 * 60; // 20:00
let timerInterval = null;
let score = 0;

/***********************
 * TIMER
 ***********************/
function startTimer() {
  const timerEl = document.getElementById("timer");

  timerInterval = setInterval(() => {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    timerEl.textContent = `${minutes}:${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitAnswers();
    }
    timeLeft--;
  }, 1000);
}

/***********************
 * RENDER PASSAGE
 ***********************/
function renderPassage(text) {
  const passageEl = document.getElementById("passage");
  passageEl.innerHTML = "";

  text.forEach(p => {
    const para = document.createElement("p");
    para.textContent = p;
    passageEl.appendChild(para);
  });
}

/***********************
 * HIGHLIGHT (TEXT SELECTION)
 ***********************/
document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (!selection || selection.toString().trim() === "") return;

  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.className = "highlight";
  range.surroundContents(span);
  selection.removeAllRanges();
});

/***********************
 * RENDER QUESTIONS
 ***********************/
function renderQuestions(questions) {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  questions.forEach((q, index) => {
    const qBox = document.createElement("div");
    qBox.className = "question-box";

    const title = document.createElement("h4");
    title.textContent = `${index + 1}. ${q.question}`;
    qBox.appendChild(title);

    // TRUE / FALSE / NOT GIVEN
    if (q.type === "single") {
      q.options.forEach(opt => {
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="radio" name="q${index}" value="${opt}">
          ${opt}
        `;
        qBox.appendChild(label);
      });
    }

    // CHECKBOX WITH LIMIT
    if (q.type === "multiple") {
      q.options.forEach(opt => {
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="checkbox" name="q${index}" value="${opt}">
          ${opt}
        `;
        qBox.appendChild(label);
      });

      qBox.addEventListener("change", () => {
        const checked = qBox.querySelectorAll("input[type=checkbox]:checked");
        if (checked.length > q.limit) {
          checked[checked.length - 1].checked = false;
        }
      });
    }

    // INPUT (ONE WORD ONLY)
    if (q.type === "input") {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Write ONE WORD ONLY";
      input.dataset.index = index;
      qBox.appendChild(input);
    }

    container.appendChild(qBox);
  });
}

/***********************
 * SUBMIT & CHECK ANSWERS
 ***********************/
function submitAnswers() {
  clearInterval(timerInterval);
  score = 0;

  testData.questions.forEach((q, index) => {
    const qBox = document.querySelectorAll(".question-box")[index];

    // SINGLE
    if (q.type === "single") {
      const selected = qBox.querySelector("input:checked");
      if (selected && selected.value === q.answer) {
        score++;
        qBox.classList.add("correct");
      } else {
        qBox.classList.add("wrong");
      }
    }

    // MULTIPLE
    if (q.type === "multiple") {
      const selected = Array.from(
        qBox.querySelectorAll("input:checked")
      ).map(i => i.value);

      const correct =
        selected.length === q.answer.length &&
        selected.every(v => q.answer.includes(v));

      if (correct) {
        score++;
        qBox.classList.add("correct");
      } else {
        qBox.classList.add("wrong");
      }
    }

    // INPUT
    if (q.type === "input") {
      const input = qBox.querySelector("input");
      if (
        input.value.trim().toLowerCase() ===
        q.answer.trim().toLowerCase()
      ) {
        score++;
        qBox.classList.add("correct");
      } else {
        qBox.classList.add("wrong");
      }
    }
  });

  document.getElementById("score").textContent = score;
}

/***********************
 * RESET
 ***********************/
function resetTest() {
  location.reload();
}

/***********************
 * INIT (DATA LOADED)
 ***********************/
window.addEventListener("load", () => {
  if (!window.testData) {
    alert("Test data not found!");
    return;
  }

  renderPassage(testData.passage);
  renderQuestions(testData.questions);
  startTimer();

  document
    .getElementById("submitBtn")
    .addEventListener("click", submitAnswers);

  document
    .getElementById("resetBtn")
    .addEventListener("click", resetTest);
});