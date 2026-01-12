// reading/data/index.js
// =====================
// READING TESTS LIST
// =====================

const readingTests = [
  {
    id: "p001",
    title: "Museum Blockbuster",
    free: true
  }
  // Keyin p002, p003 shu yerga qo‘shiladi
];

// =====================
// RENDER LIST
// =====================
const list = document.getElementById("list");

readingTests.forEach(test => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="badge">${test.free ? "Free" : "Paid"}</div>
    <div class="title">${test.title}</div>
    <button class="start-btn">▶ Start</button>
  `;

  card.querySelector("button").onclick = () => {
    window.location.href = `reading.html?id=${test.id}`;
  };

  list.appendChild(card);
});