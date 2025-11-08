// 🎵 Cambia el video actual
function playVideo(videoId, songName) {
  const player = document.getElementById("player");
  const currentSong = document.getElementById("current-song");
  player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  currentSong.textContent = `🎶 Reproduciendo: ${songName}`;
}

// 🎧 Filtros por género
function filterSongs(genre) {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.display = (genre === "all" || card.dataset.genre === genre) ? "block" : "none";
  });
}

// 🌸 Fondo animado con partículas suaves
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Crear partículas rosadas
for (let i = 0; i < 40; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.7,
    dy: (Math.random() - 0.5) * 0.7,
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,150,200,0.6)";
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    // Rebote
    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
  });
  requestAnimationFrame(draw);
}
draw();

console.log("🌷 Página musical de Nicol lista en GitHub Pages 🎶");
