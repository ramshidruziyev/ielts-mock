// ===== LOAD DATA =====
document.getElementById("title").innerText = readingData.title;

// Paragraph split
const passageDiv = document.getElementById("passage");
readingData.passage.trim().split("\n\n").forEach(p => {
  const el = document.createElement("p");
  el.textContent = p;
  passageDiv.appendChild(el);
});

// ===== QUESTIONS =====
const form = document.getElementById("questionsForm");

readingData.questions.forEach(q => {
  const div = document.createElement("div");
  div.className = "question";

  const title = document.createElement("p");
  title.innerHTML = `<b>${q.id}.</b> ${q.text}`;
  div.appendChild(title);

  if (q.type === "paragraph") {
    ["A","B","C","D","E","F","G","H"].forEach(l => {
      div.innerHTML += `
        <label>
          <input type="radio" name="q${q.id}" value="${l}"> ${l}
        </label>`;
    });
  }

  if (q.type === "input") {
    div.innerHTML += `<input type="text" name="q${q.id}" />`;
  }

  if (q.type === "multi") {
    for (let k in q.options) {
      div.innerHTML += `
        <label>
          <input type="checkbox" name="q${q.id}" value="${k}"> ${k}. ${q.options[k]}
        </label>`;
    }
  }

  form.appendChild(div);
});

// ===== SUBMIT & CHECK =====
document.getElementById("submitBtn").onclick = () => {
  let score = 0;

  readingData.questions.forEach(q => {
    if (q.type === "paragraph") {
      const v = form[`q${q.id}`]?.value;
      if (v === q.answer) score++;
    }

    if (q.type === "input") {
      const v = form[`q${q.id}`]?.value.trim().toLowerCase();
      if (v === q.answer.toLowerCase()) score++;
    }

    if (q.type === "multi") {
      const checked = [...form.querySelectorAll(`input[name="q${q.id}"]:checked`)]
        .map(i => i.value);
      if (JSON.stringify(checked.sort()) === JSON.stringify(q.answer.sort())) score++;
    }
  });

  // IELTS BAND
  const bands = [
    [39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],
    [23,6],[19,5.5],[15,5],[10,4],[0,3]
  ];

  const band = bands.find(b => score >= b[0])[1];

  alert(`Score: ${score}/${readingData.questions.length}\nBand: ${band}`);
};