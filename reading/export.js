let currentData = null;

/* ================= LOAD TEST ================= */
function loadTest() {
  const testId = document.getElementById("testSelect").value;

  const oldScript = document.getElementById("testScript");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.src = `../reading/data/${testId}.js`;
  script.id = "testScript";

  script.onload = () => {
    currentData = window.readingData;
    alert("Test loaded successfully!");
  };

  document.body.appendChild(script);
}

/* ================= SIMPLE EXPORT ================= */
function exportSimple() {
  if (!currentData) return alert("Load test first!");

  let html = `
  <html>
  <head>
    <title>${currentData.title}</title>
    <style>
      body{font-family:Arial;padding:40px;}
      .question{margin-bottom:10px;}
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

  download(html, currentData.id + "-simple.html");
}

/* ================= INTERACTIVE EXPORT ================= */
function exportInteractive() {
  if (!currentData) return alert("Load test first!");

  const html = `
  <html>
  <head>
    <title>${currentData.title}</title>
    <style>
      body{font-family:Arial;padding:20px;}
      .question{margin-bottom:10px;}
    </style>
  </head>
  <body>
    <h1>${currentData.title}</h1>
    ${currentData.passage}
    <hr>
    <h2>Questions included</h2>
    <p>This is interactive export template.</p>
  </body>
  </html>
  `;

  download(html, currentData.id + "-interactive.html");
}

/* ================= PRINT EXPORT ================= */
function exportPrint() {
  exportSimple();
}

/* ================= DOWNLOAD HELPER ================= */
function download(content, filename) {
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}