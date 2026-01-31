/* =====================================================
   IELTS READING – TESTLAR RO‘YXATI
   Bu fayl reading/index.html tomonidan o‘qiladi
===================================================== */

/*
  QOIDALAR:
  - id → p001, p002, p003 ...
  - title → passage nomi
*/

const readingTests = [
  {
    id: "p001",
    title: "Museum Blockbuster"
  },
  {
    id: "p002",
    title: "Australia’s Cane Toad Problem"
  }

  // 🔽 KEYIN QO‘SHISH OSON
  // {
  //   id: "p003",
  //   title: "Sleeping on the Job"
  // }
];

/* =====================================================
   SAHIFAGA TESTLARNI CHIQARISH
===================================================== */

const list = document.getElementById("list");

// ❌ Hech qanday error yoki alert chiqarmaymiz
if (!list) return;

/* TEST KARTALARI */
readingTests.forEach(test => {
  const card = document.createElement("div");
  card.className = "test-card";

  card.innerHTML = `
    <div class="badge">Free</div>
    <div class="test-title">${test.title}</div>
    <button class="start-btn">
      ▶ Start
    </button>
  `;

  card.querySelector(".start-btn").addEventListener("click", () => {
    // TO‘G‘RI YO‘L
    window.location.href = `reading.html?id=${test.id}`;
  });

  list.appendChild(card);
});