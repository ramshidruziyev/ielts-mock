// reading.js

const app = document.getElementById("app");
const timerEl = document.getElementById("timer");

/* =========================
   URL dan ID olish
========================= */
const params = new URLSearchParams(window.location.search);
const testId = params.get("id");

if (!testId) {
  app.innerHTML = "<p style='padding:20px'>Test ID topilmadi</p>";
} else {
  loadTest(testId);
}

/* =========================
   DATA SCRIPT YUKLASH
========================= */
function loadTest(id) {
  const script = document.createElement("script");
  script.src = `data/${id}.js`;

  script.onload = () => {
    if (!window.readingData) {
      app.innerHTML = "<p style='padding:20px'>Test data yo‘q</p>";
      return;
    }

    renderTest(window.readingData);
    startTimer(window.readingData.timeLimitMinutes || 20);
  };

  script.onerror = () => {
    app.innerHTML = "<p style='padding:20px'>Test yuklanmadi</p>";
  };

  document.body.appendChild(script);
}

/* =========================
   TESTNI CHIZISH
========================= */
function renderTest(data) {
  app.innerHTML = `
    <div class="reading-layout">
      <section class="passage">
        <h2>${data.title}</h2>
        ${data.passage
          .trim()
          .split("\n\n")
          .map(p => `<p>${p.trim()}</p>`)
          .join("")}
      </section>

      <section class="questions">
        ${data.questions.map(renderQuestion).join("")}
      </section>
    </div>
  `;
}

/* =========================
   SAVOLLAR
========================= */
function renderQuestion(q) {
  if (q.type === "paragraph") {
    return `
      <div class="question">
        <p><b>${q.id}.</b> ${q.text}</p>
        <input type="text" placeholder="A–H" />
      </div>
    `;
  }

  if (q.type === "input") {
    return `
      <div class="question">
        <p><b>${q.id}.</b> ${q.text}</p>
        <input type="text" />
      </div>
    `;
  }

  if (q.type === "multi") {
    return `
      <div class="question">
        <p><b>${q.id}.</b> ${q.text}</p>
        ${Object.entries(q.options)
          .map(
            ([k, v]) =>
              `<label><input type="checkbox"> ${k}. ${v}</label><br>`
          )
          .join("")}
      </div>
    `;
  }

  return "";
}

/* =========================
   TIMER
========================= */
function startTimer(min) {
  let sec = min * 60;

  setInterval(() => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    timerEl.textContent = `${m}:${s.toString().padStart(2, "0")}`;
    if (sec > 0) sec--;
  }, 1000);
}