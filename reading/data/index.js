/* =====================================================
   IELTS READING – TEST INDEX (FINAL)
   Bu fayl reading/index.html tomonidan o‘qiladi
   Faqat SHU YERGA test qo‘shib boriladi
===================================================== */

/*
  FORMAT:
  {
    id: "p001",
    title: "Museum Blockbuster"
  }

  QOIDALAR:
  - id → data ichidagi fayl nomi (p001.js, p002.js, ...)
  - title → foydalanuvchiga ko‘rinadigan nom
*/

const readingTests = [
  {
    id: "p001",
    title: "Museum Blockbuster"
  }

  // =============================
  // YANGI TEST QO‘SHISH MISOLI
  // =============================
  // ,
  // {
  //   id: "p002",
  //   title: "Sleeping on the Job"
  // }
];

/* =====================================================
   SAHIFAGA TESTLARNI CHIQARISH
===================================================== */

const list = document.getElementById("list");

if (!list) {
  console.error("❌ #list elementi topilmadi (reading/index.html)");
}

readingTests.forEach(test => {
  const card = document.createElement("div");
  card.className = "test-card";

  card.innerHTML = `
    <div class="badge">Free</div>
    <div class="test-title">${test.title}</div>
    <button class="start-btn">▶ Start</button>
  `;

  card.querySelector(".start-btn").onclick = () => {
    window.location.href = `reading.html?id=${test.id}`;
  };

  list.appendChild(card);
});