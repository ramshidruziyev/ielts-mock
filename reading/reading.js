let timer, timeLeft;

window.onload = () => {
  if (!window.readingData) return;
  renderTest();
  startTimer(readingData.timeLimitMinutes);
};

function renderTest() {
  const passageBox = document.getElementById("passage");
  const qBox = document.getElementById("questions");

  // PARAGRAPHS + HIGHLIGHT
  readingData.passage.trim().split(/\n(?=[A-H]\.)/).forEach(p => {
    const div = document.createElement("div");
    div.className = "paragraph";
    div.textContent = p;
    div.onclick = () => div.classList.toggle("highlight");
    passageBox.appendChild(div);
  });

  // QUESTIONS
  readingData.questions.forEach(q => {
    const d = document.createElement("div");
    d.className = "question";

    if (q.type === "paragraph") {
      d.innerHTML = `<p>${q.id}. ${q.text}</p>
      <input data-id="${q.id}" placeholder="A–H">`;
    }

    if (q.type === "input") {
      d.innerHTML = `<p>${q.id}. ${q.text}</p>
      <input data-id="${q.id}">`;
    }

    if (q.type === "multi") {
      d.innerHTML = `<p>${q.id}. ${q.text} (Choose ${q.answer.length})</p>`;
      Object.entries(q.options).forEach(([k,v])=>{
        d.innerHTML += `
          <label>
            <input type="checkbox" name="q${q.id}" value="${k}">
            ${k}. ${v}
          </label><br>`;
      });
      d.addEventListener("change",()=>limit(q.id,q.answer.length));
    }

    qBox.appendChild(d);
  });

  document.getElementById("submitBtn").onclick = submit;
}

function limit(id,max){
  const c=document.querySelectorAll(`input[name="q${id}"]:checked`);
  if(c.length>max)c[c.length-1].checked=false;
}

function startTimer(m){
  timeLeft=m*60;
  timer=setInterval(()=>{
    document.getElementById("timer").innerText =
      Math.floor(timeLeft/60)+":"+String(timeLeft%60).padStart(2,"0");
    if(--timeLeft<0){clearInterval(timer);submit();}
  },1000);
}

function submit(){
  clearInterval(timer);
  let score=0;

  readingData.questions.forEach(q=>{
    if(q.type!=="multi"){
      const v=document.querySelector(`[data-id="${q.id}"]`).value.trim().toLowerCase();
      if(v===q.answer.toLowerCase())score++;
    }else{
      const sel=[...document.querySelectorAll(`input[name="q${q.id}"]:checked`)]
        .map(i=>i.value).sort();
      if(JSON.stringify(sel)===JSON.stringify([...q.answer].sort()))score++;
    }
  });

  const r=JSON.parse(localStorage.getItem("mockResults")||"[]");
  r.push({
    test: readingData.title,
    score,
    total: readingData.questions.length,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("mockResults",JSON.stringify(r));

  alert(`Score: ${score}/${readingData.questions.length}`);
}