// reading.js

const params = new URLSearchParams(location.search);
const testId = params.get("id");

if (!testId) {
  alert("Test ID yo‘q");
  throw new Error("Missing test id");
}

/* =============================
   DYNAMIC DATA LOADER (YAKKA)
============================= */
const script = document.createElement("script");
script.src = `data/${testId}.js`;
script.defer = true;

script.onload = () => {
  if (!window.readingData) {
    alert("Reading data yuklanmadi!");
    return;
  }
  init(window.readingData);
};

script.onerror = () => {
  alert("Test topilmadi: " + testId);
};

document.head.appendChild(script);

/* =============================
   INIT
============================= */
function init(data) {
  renderPassage(data.passage);
  renderQuestions(data.questions);
  startTimer(data.time || 20);
}

/* =============================
   PASSAGE
============================= */
function renderPassage(html) {
  document.getElementById("passage").innerHTML = html;
}

/* =============================
   QUESTIONS
============================= */
function renderQuestions(list) {
  const box = document.getElementById("questions");
  box.innerHTML = "";

  list.forEach(q => {
    const div = document.createElement("div");
    div.className = "q";

    if (q.type === "paragraph" || q.type === "input") {
      div.innerHTML = `
        <p>${q.id}.</p>
        <input type="text" data-answer="${q.answer}">
      `;
    }

    if (q.type === "multi") {
      div.innerHTML = `<p>${q.id}.</p>`;
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

  applyLimits();
}

/* =============================
   CHECKBOX LIMIT
============================= */
function applyLimits() {
  document.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.onchange = () => {
      const name = cb.name;
      const limit = +cb.dataset.limit;
      const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
      if (checked.length > limit) cb.checked = false;
    };
  });
}

/* =============================
   TIMER
============================= */
function startTimer(min) {
  let t = min * 60;
  const el = document.getElementById("timer");

  setInterval(() => {
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    el.textContent = `${m}:${s}`;
    if (t > 0) t--;
  }, 1000);
}