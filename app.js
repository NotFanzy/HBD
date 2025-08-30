// ====== STATE (ubah default nama/panggilan di sini) ======
let STATE = { nama: "Kak Mundi", panggilan: "Moon / Bulan" };

// ====== Ucapan (gabungan & adaptasi dari versi Java/C# ke JS) ======
const bullets = [
  "Semoga hidupmu seperti fase bulan: sabit sampai purnama—tetap bikin orang menengadah kagum.",
  "Upgrade usia sukses: umur_baru = umur_lama + 1; // auto nambah tawa dan rezeki.",
  "Tetap jadi satelit persahabatan paling setia—nggak pernah keluar dari orbit yang sayang padamu.",
  "Kalau ada 'gerhana', anggap itu cuma bayangan lewat. Setelah itu bersinar lagi lebih terang!",
  "Rezeki seterang purnama, ide seliar meteor, hati seteduh malam berbulan.",
  "Semoga hari-harimu nggak lagi overthinking, cukup over–the–moon aja. 🌝",
  "Kalau lagi capek, ingat: bahkan bulan pun punya fase istirahat. Kamu juga boleh redup sebentar.",
  "Doaku: setiap target mendarat mulus—tanpa perlu roket cadangan. 🚀",
  "Semoga lingkar pertemananmu sehangat selimut galaksi—nggak kepanasan, nggak kedinginan.",
  "Di umur baru, semoga kamu makin jago bilang ‘nggak apa-apa’ ke hal yang bukan untukmu, biar orbitmu tetap sehat.",
  "Kebahagiaanmu jangan dicicil—langsung lunasi tiap hari dengan senyum kecil yang konsisten.",
  "Semoga semua drama hidupmu diarsipkan jadi highlight lucu, bukan cliffhanger. 🎬",
  "Kalau rencana A gagal, ingat: alfabet masih ada sampai Z, plus emoji. 🅰️➡️🅿️",
  "Semoga dompetmu setia seperti gravitasi: selalu balik lagi walau sempat melayang. 💸",
  "Di timeline hidupmu, semoga algoritma semesta makin relevan dan minim iklan gangguan. 📈",
  "Semoga tidurmu lelap seperti astronot mode hibernasi, bangun-bangun langsung purnama.",
  "Semoga setiap ‘sad mode’ jadi intro lagu bahagia selanjutnya."
];
const punchlines = [
  "Terima kasih sudah jadi kakak onlen-ku—hadir di chat seperti gravitasi yang menenangkan. 🤝",
  "Semoga notifikasi darimu selalu muncul pas lagi butuh semangat. 📲",
  "Kalau bahagia itu gravitasi, kamu pusat orbit-nya. 🌚",
  "Namamu Bulan, tapi vibe-mu bintang lima. ✨",
  "Kalau semesta lagi buffering, sabar ya—progress bar-nya menuju hal baik. ⏳",
  "Walau sad mode kadang nyala, kamu tetap lampu malam favorit kami."
];

// ====== Util ======
function sample(arr, n=1){
  const pool=[...arr];
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
  return pool.slice(0,n);
}

// ====== Render ======
function render() {
  document.getElementById('nama').textContent = STATE.nama;

  const opening = `Halo <strong>${STATE.nama}</strong>—alias <em>${STATE.panggilan}</em>! Ini paket ucapan edisi kosmik khusus untukmu:`;
  document.getElementById('opening').innerHTML = `<p class="bullet">${opening}</p>`;

  const n = Math.floor(Math.random()*3)+4; // 4–6 bullets
  const chosen = sample(bullets, n);
  document.getElementById('bullets').innerHTML = chosen.map(t=>`<p class="bullet">• ${t}</p>`).join("");

  document.getElementById('punch').innerHTML = `<p class="bullet"><em>${sample(punchlines,1)[0]}</em></p>`;
}

function reroll(){ render(); boomMany(2); toast('Diacak 🎲'); }

function editNama(){
  const n = prompt("Nama yang ditampilkan:", STATE.nama) || STATE.nama;
  const p = prompt("Panggilan:", STATE.panggilan) || STATE.panggilan;
  STATE.nama = n.trim(); STATE.panggilan = p.trim(); render(); toast('Nama diperbarui ✏️'); boomMany(1);
}

function copyText(){
  const b = Array.from(document.querySelectorAll('#bullets .bullet')).map(p => p.textContent).join("\n");
  const text = `Selamat Ulang Tahun, ${STATE.nama} (${STATE.panggilan})!\n` +
    `Halo ${STATE.nama}—alias ${STATE.panggilan}! Ini paket ucapan edisi kosmik khusus untukmu:\n` +
    b + "\n" + document.querySelector('#punch .bullet').textContent + "\n" +
    "Penutup: Tetap jadi cahaya di malam siapa pun, dengan cara yang cuma kamu punya. HBD! 🎂🌕\n" +
    "dibuat oleh irfan + sad mode";
  navigator.clipboard.writeText(text);
  toast('Tersalin ke clipboard 📋');
}

function toast(msg){
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),1400);
}

// ====== Balon ======
function spawnBalloons(){
  const colors=['#FF6B6B','#FFD166','#95E1D3','#A29BFE','#F6BD60','#00D1FF','#FF99C8'];
  const cont=document.getElementById('balloons');
  for(let i=0;i<14;i++){
    const b=document.createElement('div');
    b.className='balloon';
    b.style.setProperty('--c', colors[Math.floor(Math.random()*colors.length)]);
    b.style.left = Math.random()*100 + 'vw';
    b.style.setProperty('--dur', (14 + Math.random()*10) + 's');
    b.style.width = (36+Math.random()*18)+'px';
    b.style.height = (48+Math.random()*22)+'px';
    b.style.animationDelay = (-Math.random()*12)+'s';
    cont.appendChild(b);
  }
}

// ====== Fireworks ======
const canvas = document.getElementById('fx');
const ctx = canvas.getContext('2d', { alpha: true });
let W,H,particles=[];

function resize(){ W=canvas.width=innerWidth; H=canvas.height=innerHeight; }
addEventListener('resize', resize);

class Particle{
  constructor(x,y,col,vel,life){
    this.x=x; this.y=y; this.vx=vel.x; this.vy=vel.y; this.alpha=1; this.col=col;
    this.life=life; this.maxLife=life; this.size=2+Math.random()*2;
    this.gravity = 0.06 + Math.random()*0.06;
    this.drag = 0.992;
  }
  step(){
    this.vx *= this.drag; this.vy = this.vy*this.drag + this.gravity;
    this.x += this.vx; this.y += this.vy;
    this.alpha = Math.max(0, this.life/this.maxLife);
    this.life--;
    return this.life>0 && this.alpha>0 && this.y < H+20;
  }
  draw(){
    ctx.globalCompositeOperation='lighter';
    ctx.globalAlpha=this.alpha;
    ctx.fillStyle=this.col;
    ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=1;
  }
}

function randPalette(){
  const banks = [
    ['#ffadad','#ffd6a5','#fdffb6','#caffbf','#9bf6ff','#bdb2ff'],
    ['#ff9aa2','#ffb7b2','#ffdac1','#e2f0cb','#b5ead7','#c7ceea'],
    ['#ffd166','#ef476f','#06d6a0','#118ab2','#a29bfe','#fcbf49'],
    ['#f94144','#f3722c','#f8961e','#90be6d','#577590','#43aa8b']
  ];
  return banks[Math.floor(Math.random()*banks.length)];
}

function boom(x,y,colors=randPalette()){
  const N = 42 + Math.floor(Math.random()*48);
  for(let i=0;i<N;i++){
    const a = Math.random()*Math.PI*2;
    const sp = 2 + Math.random()*4.6;
    const vel = { x: Math.cos(a)*sp, y: Math.sin(a)*sp };
    const life = 40 + Math.floor(Math.random()*30);
    const col = colors[Math.floor(Math.random()*colors.length)];
    particles.push(new Particle(x,y,col,vel,life));
  }
}

function animate(){
  ctx.clearRect(0,0,W,H);
  particles = particles.filter(p=>p.step());
  for(const p of particles) p.draw();
  requestAnimationFrame(animate);
}

function boomScreen(){
  const x = innerWidth* (0.15 + Math.random()*0.7);
  const y = innerHeight* (0.25 + Math.random()*0.4);
  boom(x,y);
}
function boomMany(n=5){ for(let i=0;i<n;i++){ setTimeout(boomScreen, i*160); } }

// ====== Init ======
function init(){
  resize(); animate(); render(); spawnBalloons();
  setTimeout(()=>boomMany(6), 500);
  setTimeout(()=>boomMany(6), 1400);
}

document.addEventListener('DOMContentLoaded', init);

// Expose a few functions to global for buttons
window.reroll = reroll;
window.editNama = editNama;
window.copyText = copyText;
window.boomMany = boomMany;
