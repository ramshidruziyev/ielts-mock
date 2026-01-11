/* =====================================================
   IELTS READING – DATA INDEX (AUTO SCALABLE)
   Bu fayl barcha reading passage'larni avtomatik boshqaradi
   ===================================================== */

(function () {
  /*
    ❗ BU RO‘YXATNI KENGAYTIRISH OSON ❗

    Faqat pXXX qo‘shasan, boshqa hech narsa qilinmaydi.
    reading.html?id=p001
    reading.html?id=p002
    reading.html?id=p1500
  */

  const tests = {};

  // 🔹 QANCHA PASSAGE BO‘LSA HAM O‘QIYDI (1–5000)
  for (let i = 1; i <= 5000; i++) {
    const id = "p" + String(i).padStart(3, "0");

    tests[id] = {
      id,
      title: `Reading Passage ${i}`,
      file: `${id}.js`,
      timeLimitMinutes: 20
    };
  }

  // 🔹 GLOBAL QILIB QO‘YAMIZ
  window.READING_TESTS = tests;

  // 🔹 DEBUG (xohlasang o‘chir)
  console.log("READING INDEX READY. Total tests:", Object.keys(tests).length);
})();