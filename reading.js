// reading.js

const passageDiv = document.getElementById("passage");
const questionsDiv = document.getElementById("questions");
const titleEl = document.getElementById("testTitle");
const timerEl = document.getElementById("timer");
const submitBtn = document.getElementById("submitBtn");

// ===== GET TEST ID =====
const params = new URLSearchParams(window.location.search);
const testId = params.get("id") || "p001";

// ===== LOAD DATA FILE =====
const script = document.createElement("script");
script.src = `reading-data/${testId}.js`;
script.onload = initTest;
script.onerror = () => {
  passageDiv.innerHTML = "❌ Test topilmadi";
  questionsDiv.innerHTML = "";
};
document.body.appendChild(script);

// ===== INIT =====
function initTest() {
  if (typeof readingData === "undefined") {
    passageDiv.innerHTML = "❌ readingData topilmadi";
    return;
  }

  titleEl.textContent = readingData.title;
  passageDiv.innerText = readingData.passage;

  renderQuestions();
  startTimer(readingData.timeLimitMinutes || 20);
}

// ===== QUESTIONS =====
function renderQuestions() {
  questionsDiv.innerHTML = "";

  readingData.questions.forEach(q => {
    const block = document.createElement("div");
    block.className = "question";

    let html = `<p><strong>${q.id}.</strong> ${q.text}</p>`;

    if (q.type === "paragraph_matching") {
      html += `<input type="text" data-id="${q.id}" placeholder="A-G" />`;
    }

    if (q.type === "summary") {
      html += `<input type="text" data-id="${q.id}" placeholder="Answer" />`;
    }

    if (q.type === "multiple_choice") {
      Object.entries(q.options).forEach(([k, v]) => {
        html += `
          <label>
            <input type="checkbox" name="q${q.id}" value="${k}">
            ${k}. ${v}
          </label><br>
        `;
      });
    }

    block.innerHTML = html;
    questionsDiv.appendChild(block);
  });
}

// ===== SUBMIT =====
submitBtn.onclick = () => {
  let correct = 0;

  readingData.questions.forEach(q => {
    if (q.type === "paragraph_matching" || q.type === "summary") {
      const input = document.querySelector(`input[data-id="${q.id}"]`);
      if (!input) return;
      if (input.value.trim().toLowerCase() === q.answer.toLowerCase()) {
        correct++;
        input.style.borderColor = "green";
      } else {
        input.style.borderColor = "red";
      }
    }

    if (q.type === "multiple_choice") {
      const checked = [...document.querySelectorAll(`input[name="q${q.id}"]:checked`)]
        .map(i => i.value)
        .sort()
        .join("");

      const answer = q.answer.sort().join("");
      if (checked === answer) correct++;
    }
  });

  const band = calcBand(correct, readingData.questions.length);
  alert(`To‘g‘ri javoblar: ${correct}\nBand score: ${band}`);
};

// ===== BAND SCORE =====
function calcBand(score, total) {
  const ratio = score / total;
  if (ratio >= 0.9) return 9;
  if (ratio >= 0.8) return 8;
  if (ratio >= 0.7) return 7;
  if (ratio >= 0.6) return 6;
  if (ratio >= 0.5) return 5;
  return 4;
}

// ===== TIMER =====
function startTimer(mins) {
  let seconds = mins * 60;
  setInterval(() => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    timerEl.textContent = `${m}:${s.toString().padStart(2, "0")}`;
    seconds--;
  }, 1000);
}