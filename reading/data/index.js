/* =====================================================
   IELTS Reading Tests – Index
   Bu fayl reading/index.html tomonidan o‘qiladi
   Yangi test qo‘shish juda oson
===================================================== */

/*
  QOIDALAR:
  - id → p001, p002, p003 ...
  - title → test nomi
*/

const readingTests = [
  {
    id: "p001",
    title: "Museum Blockbuster"
  }

  // 🔽 YANGI TEST QO‘SHISH NAMUNASI
  // {
  //   id: "p002",
  //   title: "Sleeping on the Job"
  // }
];

/* =====================================================
   RO‘YXATNI SAHIFAGA CHIQARISH
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
    <button class="start-btn">
      ▶ Start
    </button>
  `;

  card.querySelector(".start-btn").onclick = () => {
    window.location.href = `reading.html?id=${test.id}`;
  };

  list.appendChild(card);
});