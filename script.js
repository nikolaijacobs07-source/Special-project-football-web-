const teams=[
{id:2001,name:"Humble Lion",icon:"🦁",players:[[3001,"John","Brown","Goal Keeper"],[3002,"Mike","Smith","Defender"],[3003,"Luke","Taylor","Defender"],[3004,"Chris","Evans","Midfielder"],[3005,"Aaron","Lee","Forward"]]},
{id:2002,name:"Red Dragon FC",icon:"🐉",players:[[3011,"Dave","Herdsman","Goal Keeper"],[3012,"James","White","Defender"],[3013,"Kevin","Brown","Defender"],[3014,"Ryan","Green","Midfielder"],[3015,"Tom","Davis","Forward"]]},
{id:2003,name:"Blue Sharks",icon:"🦈",players:[[3021,"Jason","Miller","Goal Keeper"],[3022,"Ethan","Clark","Defender"],[3023,"Liam","Hall","Defender"],[3024,"Noah","Allen","Midfielder"],[3025,"Mason","Young","Forward"]]},
{id:2004,name:"Golden Eagles",icon:"🦅",players:[[3031,"Caleb","Johnson","Goal Keeper"],[3032,"Oliver","Harris","Defender"],[3033,"Elijah","Martin","Defender"],[3034,"Lucas","Walker","Midfielder"],[3035,"Henry","King","Forward"]]}
];
const fixtures=[
["Sep 28, 2026","Humble Lion","Golden Eagles","6:00 PM","Elite Stadium"],
["Sep 28, 2026","Red Dragon FC","Blue Sharks","8:00 PM","Elite Stadium"],
["Oct 02, 2026","Humble Lion","Blue Sharks","6:00 PM","Elite Stadium"],
["Oct 02, 2026","Golden Eagles","Red Dragon FC","8:00 PM","Elite Stadium"],
["Oct 06, 2026","Humble Lion","Red Dragon FC","6:00 PM","Elite Stadium"],
["Oct 06, 2026","Blue Sharks","Golden Eagles","8:00 PM","Elite Stadium"]];
const results=[
["Sep 20, 2026","Humble Lion","Blue Sharks",2,1,"Elite Stadium"],
["Sep 20, 2026","Red Dragon FC","Golden Eagles",1,1,"Elite Stadium"]];
const scorers=[
["Aaron Lee","Humble Lion",3],["Tom Davis","Red Dragon FC",2],["Mason Young","Blue Sharks",2],["Henry King","Golden Eagles",2],["Chris Evans","Humble Lion",1]];

const tg=document.querySelector("#teamsGrid");
teams.forEach(t=>tg.innerHTML+=`<article class="team"><div class="crest">${t.icon}</div><h3>${t.name}</h3><small>Team ID ${t.id} • ${t.players.length} players</small></article>`);
const f=document.querySelector("#filter");teams.forEach(t=>f.innerHTML+=`<option value="${t.id}">${t.name}</option>`);
function players(){let v=f.value,el=document.querySelector("#playersGrid");el.innerHTML="";teams.filter(t=>v==="all"||String(t.id)===v).forEach(t=>t.players.forEach(p=>el.innerHTML+=`<article class="player"><div class="avatar">${(p[1][0]+p[2][0]).toUpperCase()}</div><h3>${p[1]} ${p[2]}</h3><p>${t.name} • Player ID ${p[0]}</p><span class="role">${p[3]}</span></article>`))}
f.onchange=players;players();

document.querySelector("#fixturesList").innerHTML=fixtures.map(x=>`<div class="match"><div class="date">${x[0]}</div><div class="teamsline"><span>${x[1]}</span><span class="vs">VS</span><span>${x[2]}</span></div><div class="info">${x[3]}<br>${x[4]}</div></div>`).join("");
document.querySelector("#resultsList").innerHTML=results.map(x=>`<div class="match"><div class="date">${x[0]}</div><div class="teamsline"><span>${x[1]}</span><span class="score">${x[3]} - ${x[4]}</span><span>${x[2]}</span></div><div class="info">FINAL<br>${x[5]}</div></div>`).join("");

let s={};teams.forEach(t=>s[t.name]={p:0,w:0,d:0,l:0,gf:0,ga:0});results.forEach(x=>{let a=s[x[1]],b=s[x[2]],as=x[3],bs=x[4];a.p++;b.p++;a.gf+=as;a.ga+=bs;b.gf+=bs;b.ga+=as;if(as>bs){a.w++;b.l++}else if(bs>as){b.w++;a.l++}else{a.d++;b.d++}});
let rows=teams.map(t=>({name:t.name,...s[t.name],gd:s[t.name].gf-s[t.name].ga,pts:s[t.name].w*3+s[t.name].d})).sort((a,b)=>b.pts-a.pts||b.gd-a.gd);
document.querySelector("#tableBody").innerHTML=rows.map((r,i)=>`<tr><td class="rank">${i+1}</td><td><b>${r.name}</b></td><td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td><td>${r.gf}</td><td>${r.ga}</td><td>${r.gd>0?"+":""}${r.gd}</td><td class="pts">${r.pts}</td></tr>`).join("");
document.querySelector("#scorersGrid").innerHTML=scorers.map((x,i)=>`<article class="scorer"><div class="num">0${i+1}</div><h3>${x[0]}</h3><p>${x[1]}</p><div class="goals">⚽ ${x[2]} GOALS</div></article>`).join("");
document.querySelector("#regForm").addEventListener("submit",e=>{e.preventDefault();document.querySelector("#formMsg").textContent="Registration received! The tournament organizer can now review this submission.";document.querySelector("#formMsg").style.color="#087b43"});
document.querySelector("#menu").onclick=()=>document.querySelector(".nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.querySelector(".nav").classList.remove("open"));