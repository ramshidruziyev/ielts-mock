let currentData = null;

/* ================= LOAD TEST ================= */
function loadTest() {
  const testId = document.getElementById("testSelect").value;

  const oldScript = document.getElementById("dynamicTestScript");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.src = `../reading/data/${testId}.js`;
  script.id = "dynamicTestScript";

  script.onload = () => {
    currentData = window.readingData;
    alert("Test loaded successfully!");
  };

  script.onerror = () => {
    alert("Test yuklanmadi! Pathni tekshir.");
  };

  document.body.appendChild(script);
}

/* ================= SIMPLE EXPORT ================= */
function exportSimple() {
  if (!currentData) {
    alert("Avval Load Test bosing!");
    return;
  }

  let html = `
  <html>
  <head>
    <title>${currentData.title}</title>
    <style>
      body { font-family: Arial; padding: 40px; }
      .question { margin-bottom: 10px; }
    </style>
  </head>
  <body>
    <h1>${currentData.title}</h1>
    ${currentData.passage}
    <hr>
  `;

  currentData.questions.forEach(q => {
    if (q.type === "multi-group") {
      q.questions.forEach(sub => {
        html += `<div class="question"><b>${sub.id}.</b> ${sub.text}</div>`;
      });
    } else {
      html += `<div class="question"><b>${q.id}.</b> ${q.text}</div>`;
    }
  });

  html += `</body></html>`;

  downloadFile(html, currentData.id + "-simple.html");
}

/* ================= INTERACTIVE EXPORT ================= */
function exportInteractive() {
  if (!currentData) {
    alert("Avval Load Test bosing!");
    return;
  }

  let html = `
  <html>
  <head>
    <title>${currentData.title}</title>
    <style>
      body { font-family: Arial; padding: 20px; }
    </style>
  </head>
  <body>
    <h1>${currentData.title}</h1>
    ${currentData.passage}
    <hr>
    <h2>Interactive version template</h2>
    <p>Bu versiyada keyinchalik timer va score qo‘shamiz.</p>
  </body>
  </html>
  `;

  downloadFile(html, currentData.id + "-interactive.html");
}

/* ================= PRINT VERSION ================= */
function exportPrint() {
  exportSimple();
}

/* ================= DOWNLOAD HELPER ================= */
function downloadFile(content, filename) {
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}