const params = new URLSearchParams(location.search);
const id = params.get("id");

const script = document.createElement("script");
script.src = "data/" + id + ".js";
script.onload = init;
document.body.appendChild(script);

let time, interval;

function init() {
  document.getElementById("title").innerText = READING_DATA.title;
  renderPassage();
  renderQuestions();
  startTimer(READING_DATA.timeLimit);
}

function renderPassage() {
  const p = document.getElementById("passage");
  Object.entries(READING_DATA.passage).forEach(([k,v])=>{
    const d=document.createElement("div");
    d.className="para";
    d.innerHTML=`<b>${k}.</b> ${v}`;
    d.onclick=()=>d.classList.toggle("highlight");
    p.appendChild(d);
  });
}

function renderQuestions() {
  const q=document.getElementById("questions");
  READING_DATA.questions.forEach(x=>{
    let html=`<div class="q"><p>${x.id}. ${x.text}</p>`;
    if(x.type==="paragraph"){
      "ABCDEFGH".split("").forEach(l=>{
        html+=`<label><input type="radio" name="q${x.id}" value="${l}">${l}</label>`;
      });
    }
    if(x.type==="input"){
      html+=`<input id="q${x.id}">`;
    }
    if(x.type==="multi"){
      x.options.forEach((o,i)=>{
        html+=`<label><input type="checkbox" data-limit="${x.limit}" name="q${x.id}" value="${i}">${o}</label>`;
      });
    }
    html+="</div>";
    q.innerHTML+=html;
  });

  document.querySelectorAll("input[type=checkbox]").forEach(c=>{
    c.onchange=()=>{
      const g=document.getElementsByName(c.name);
      const limit=c.dataset.limit;
      if([...g].filter(x=>x.checked).length>limit) c.checked=false;
    };
  });
}

function startTimer(m){
  let s=m*60;
  interval=setInterval(()=>{
    const min=String(Math.floor(s/60)).padStart(2,"0");
    const sec=String(s%60).padStart(2,"0");
    timer.innerText=min+":"+sec;
    if(--s<0) submitTest();
  },1000);
}

function submitTest(){
  clearInterval(interval);
  let score=0;
  READING_DATA.questions.forEach(q=>{
    if(q.type==="paragraph"){
      const a=document.querySelector(`input[name=q${q.id}]:checked`);
      if(a && a.value===q.answer) score++;
    }
    if(q.type==="input"){
      const v=document.getElementById("q"+q.id).value.trim().toLowerCase();
      if(v===q.answer) score++;
    }
    if(q.type==="multi"){
      const c=[...document.querySelectorAll(`input[name=q${q.id}]:checked`)].map(x=>+x.value);
      if(JSON.stringify(c.sort())===JSON.stringify(q.answer.sort())) score++;
    }
  });

  const res=JSON.parse(localStorage.getItem("readingResults")||"[]");
  res.push({title:READING_DATA.title,score,total:READING_DATA.questions.length});
  localStorage.setItem("readingResults",JSON.stringify(res));

  alert("Score: "+score+"/"+READING_DATA.questions.length);
}