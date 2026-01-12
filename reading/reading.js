// ===============================
// IELTS Reading Main JS
// ===============================

const params = new URLSearchParams(window.location.search);
const testId = params.get("id");

if (!testId) {
  alert("Test ID yo‘q");
  throw new Error("No test id");
}

// ===== Dynamic data loader =====
const script = document.createElement("script");
script.src = `data/${testId}.js`;

script.onload = () => {
  if (!window.readingData) {
    alert("Reading data yuklanmadi!");
    return;
  }
  initReading(window.readingData);
};

script.onerror = () => {
  alert("Test topilmadi: " + testId);
};

document.body.appendChild(script);

// ===============================
// INIT
// ===============================
function initReading(data) {
  document.getElementById("passage").innerHTML = data.passage;
  renderQuestions(data.questions);
  startTimer(data.time || 20);
}

// ===============================
// QUESTIONS
// ===============================
function renderQuestions(questions) {
  const box = document.getElementById("questions");
  box.innerHTML = "";

  questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question-box";

    if (q.type === "paragraph") {
      div.innerHTML = `
        <p>${q.id}. Which paragraph?</p>
        <input type="text" data-answer="${q.answer}">
      `;
    }

    if (q.type === "input") {
      div.innerHTML = `
        <p>${q.id}. Complete:</p>
        <input type="text" data-answer="${q.answer}">
      `;
    }

    if (q.type === "multi") {
      div.innerHTML = `<p>${q.id}. Choose ${q.limit}</p>`;
      Object.entries(q.options || {}).forEach(([k, v]) => {
        div.innerHTML += `
          <label>
            <input type="checkbox" name="q${q.id}" value="${k}" data-limit="${q.limit}">
            ${k}. ${v}
          </label><br>
        `;
      });
    }

    box.appendChild(div);
  });

  applyCheckboxLimits();
}

// ===============================
// CHECKBOX LIMIT
// ===============================
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

// ===============================
// TIMER
// ===============================
function startTimer(min) {
  let sec = min * 60;
  const el = document.getElementById("timer");

  setInterval(() => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    el.textContent = `${m}:${s}`;
    if (sec > 0) sec--;
  }, 1000);
}