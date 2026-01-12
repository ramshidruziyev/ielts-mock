// reading.js

const params = new URLSearchParams(window.location.search);
const testId = params.get("id");

if (!testId) {
  alert("Test ID topilmadi");
  throw new Error("No test id");
}

// ===== Dynamic script loader =====
const script = document.createElement("script");
script.src = `data/${testId}.js`; // MUHIM
script.onload = () => {
  if (!window.readingData) {
    alert("Reading data yuklanmadi");
    return;
  }
  initReading(window.readingData);
};
script.onerror = () => {
  alert("Test file topilmadi: " + testId);
};
document.body.appendChild(script);

// ===== Main init =====
function initReading(data) {
  renderPassage(data.passage);
  renderQuestions(data.questions);
  startTimer(data.time || 20);
}

// ===== Render passage =====
function renderPassage(html) {
  document.getElementById("passage").innerHTML = html;
}

// ===== Render questions =====
function renderQuestions(questions) {
  const box = document.getElementById("questions");
  box.innerHTML = "";

  questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";

    if (q.type === "paragraph") {
      div.innerHTML = `
        <p>${q.id}. ${q.text}</p>
        <input type="text" data-answer="${q.answer}">
      `;
    }

    if (q.type === "input") {
      div.innerHTML = `
        <p>${q.id}. ${q.text}</p>
        <input type="text" data-answer="${q.answer}">
      `;
    }

    if (q.type === "multi") {
      div.innerHTML = `<p>${q.id}. ${q.text}</p>`;
      Object.entries(q.options).forEach(([k, v]) => {
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

// ===== Checkbox limit =====
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

// ===== Timer =====
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