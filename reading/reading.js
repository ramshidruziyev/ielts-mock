// ===== GET TEST ID =====
const params = new URLSearchParams(window.location.search);
const testId = params.get("id") || "p001";

// ===== LOAD DATA FILE =====
const dataScript = document.createElement("script");
dataScript.src = `data/${testId}.js`;
dataScript.onload = () => {
  if (!window.readingData) {
    alert("Reading data yuklanmadi!");
    return;
  }
  initReading(window.readingData);
};
dataScript.onerror = () => {
  alert("Test file topilmadi: " + testId);
};
document.body.appendChild(dataScript);

// ===== INIT =====
function initReading(data) {
  document.getElementById("passage").innerHTML = data.passage;
  renderQuestions(data.questions);
  startTimer(data.time || 20);
}

// ===== QUESTIONS =====
function renderQuestions(questions) {
  const box = document.getElementById("questions");
  box.innerHTML = "";

  questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question-box";

    div.innerHTML = `<h4>${q.id}.</h4>`;

    if (q.type === "paragraph" || q.type === "input") {
      div.innerHTML += `<input type="text" data-answer="${q.answer}" />`;
    }

    if (q.type === "multi") {
      Object.entries(q.options || {}).forEach(([k, v]) => {
        div.innerHTML += `
          <label>
            <input type="checkbox" name="q${q.id}" value="${k}" data-limit="${q.limit}">
            ${k}. ${v}
          </label>
        `;
      });
    }

    box.appendChild(div);
  });

  applyCheckboxLimits();
}

// ===== CHECKBOX LIMIT =====
function applyCheckboxLimits() {
  document.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", () => {
      const name = cb.name;
      const limit = +cb.dataset.limit;
      const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
      if (checked.length > limit) cb.checked = false;
    });
  });
}

// ===== TIMER =====
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