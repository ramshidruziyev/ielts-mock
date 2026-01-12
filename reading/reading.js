// =====================
// IELTS READING ENGINE
// =====================

// --------- LOAD TEST ----------
const params = new URLSearchParams(window.location.search);
const testId = params.get("id");

if (!testId) {
  document.body.innerHTML = "<h2>Reading test not found</h2>";
} else {
  const script = document.createElement("script");
  script.src = `/ielts-mock/reading/data/${testId}.js`;
  script.onload = initReading;
  document.body.appendChild(script);
}

// --------- INIT ----------
function initReading() {
  const d = window.readingData;

  if (!d || !d.passage || !d.questions || !d.answers) {
    document.body.innerHTML = "<h2>Reading data is invalid</h2>";
    return;
  }

  document.getElementById("testTitle").innerText = d.title;
  document.getElementById("passage").innerHTML = d.passage;
  document.getElementById("questions").innerHTML = d.questions;

  enforceCheckboxLimits();
  startTimer(d.timeLimitMinutes || 20);

  document.getElementById("submitBtn").onclick = submitReading;
}

// --------- TIMER ----------
function startTimer(minutes) {
  let seconds = minutes * 60;
  const timerEl = document.getElementById("timer");

  const interval = setInterval(() => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    timerEl.textContent = `${m}:${String(s).padStart(2, "0")}`;

    if (seconds <= 0) {
      clearInterval(interval);
      submitReading();
    }
    seconds--;
  }, 1000);
}

// --------- CHECKBOX LIMIT ----------
function enforceCheckboxLimits() {
  document.querySelectorAll("[data-limit]").forEach(group => {
    const limit = Number(group.dataset.limit);
    const boxes = group.querySelectorAll("input[type='checkbox']");

    boxes.forEach(box => {
      box.addEventListener("change", () => {
        const checked = [...boxes].filter(b => b.checked);
        if (checked.length > limit) {
          box.checked = false;
          alert(`You can choose only ${limit} answers.`);
        }
      });
    });
  });
}

// --------- SUBMIT & CHECK ----------
function submitReading() {
  const key = window.readingData.answers;
  let correct = 0;
  let total = Object.keys(key).length;

  // TEXT INPUTS
  document.querySelectorAll("input[type='text'][data-q]").forEach(input => {
    const q = input.dataset.q;
    const user = input.value.trim().toLowerCase();
    const ans = key[q]?.toLowerCase();

    if (!ans) return;

    if (user === ans) {
      correct++;
      input.classList.add("correct");
    } else {
      input.classList.add("wrong");
    }
  });

  // CHECKBOX GROUPS
  document.querySelectorAll("div[data-q]").forEach(div => {
    const q = div.dataset.q;
    const correctAns = key[q];
    if (!Array.isArray(correctAns)) return;

    const checked = [...div.querySelectorAll("input:checked")]
      .map(i => i.value)
      .sort();

    const sortedCorrect = [...correctAns].sort();

    if (
      checked.length === sortedCorrect.length &&
      checked.every((v, i) => v === sortedCorrect[i])
    ) {
      correct++;
      div.classList.add("correct");
    } else {
      div.classList.add("wrong");
    }
  });

  // RESULT
  document.getElementById("result").innerHTML =
    `<h3>Correct answers: ${correct} / ${total}</h3>`;

  saveMockResult(correct, total);
}

// --------- SAVE RESULT ----------
function saveMockResult(score, total) {
  const history = JSON.parse(localStorage.getItem("readingResults") || "[]");
  history.push({
    test: window.readingData.title,
    score,
    total,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("readingResults", JSON.stringify(history));
}

// --------- HIGHLIGHT ----------
document.addEventListener("mouseup", () => {
  const sel = window.getSelection();
  if (!sel.rangeCount) return;

  const range = sel.getRangeAt(0);
  if (!range || range.toString().trim() === "") return;

  const span = document.createElement("span");
  span.className = "highlight";
  range.surroundContents(span);
  sel.removeAllRanges();
});