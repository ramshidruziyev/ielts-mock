const url = new URLSearchParams(location.search);
const id = url.get("id");

document.getElementById("title").textContent = readingData.title;
document.getElementById("passage").innerHTML = readingData.passage;

const qBox = document.getElementById("questions");

readingData.questions.forEach(q => {
  const div = document.createElement("div");

  if (q.type === "text") {
    div.innerHTML = `<input data-id="${q.id}" type="text">`;
  }

  if (q.type === "multi") {
    ["A","B","C","D","E","F"].forEach(l => {
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = l;
      cb.dataset.id = q.id;
      cb.onclick = () => {
        const checked = document.querySelectorAll(`input[data-id="${q.id}"]:checked`);
        if (checked.length > q.limit) cb.checked = false;
      };
      div.append(cb, l, document.createElement("br"));
    });
  }
  qBox.appendChild(div);
});

// TIMER
let time = readingData.timeLimit * 60;
setInterval(() => {
  time--;
  document.getElementById("timer").textContent = `${Math.floor(time/60)}:${time%60}`;
}, 1000);

// SUBMIT
function submitTest() {
  let score = 0;

  readingData.questions.forEach(q => {
    if (q.type === "text") {
      const val = document.querySelector(`input[data-id="${q.id}"]`).value.trim().toLowerCase();
      if (val === q.answer.toLowerCase()) score++;
    }

    if (q.type === "multi") {
      const checked = [...document.querySelectorAll(`input[data-id="${q.id}"]:checked`)].map(i => i.value);
      if (JSON.stringify(checked.sort()) === JSON.stringify(q.answer.sort())) score++;
    }
  });

  document.getElementById("result").textContent = `Score: ${score} / ${readingData.questions.length}`;
}