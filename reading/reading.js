const params = new URLSearchParams(location.search);
const testId = params.get("id");

if (!testId) {
  alert("Test ID topilmadi");
  throw new Error("NO TEST ID");
}

/* ===== LOAD DATA ===== */
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
  alert("Test file topilmadi: " + testId);
};

document.body.appendChild(script);

/* ===== INIT ===== */
function initReading(data) {
  document.getElementById("passage").innerHTML = data.passage;
  renderQuestions(data.questions);
  startTimer(data.time || 20);
}

/* ===== QUESTIONS ===== */
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
        <p>${q.id}. Complete the sentence</p>
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

  applyCheckboxLimit();
}

/* ===== CHECKBOX LIMIT ===== */
function applyCheckboxLimit() {
  document.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", () => {
      const name = cb.name;
      const limit = +cb.dataset.limit;
      const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
      if (checked.length > limit) cb.checked = false;
    });
  });
}

/* ===== TIMER ===== */
function startTimer(min) {
  let sec = min * 60;
  const el = document.getElementById("timer");

  setInterval(() => {
    el.textContent =
      String(Math.floor(sec / 60)).padStart(2, "0") + ":" +
      String(sec % 60).padStart(2, "0");
    if (sec > 0) sec--;
  }, 1000);
}