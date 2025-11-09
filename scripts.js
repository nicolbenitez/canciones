/* scripts.js
   - playVideo(videoId, title): cambia el iframe para reproducir la canción.
   - canvas neón: partículas suaves que se mueven y crean brillos.
   Nota: el código está envuelto en onload para compatibilidad con GitHub Pages.
*/

window.onload = function () {
  // ---- Reproductor ----
  window.playVideo = function (videoId, songName) {
    const player = document.getElementById('player');
    const now = document.getElementById('now');
    // Cambia src (no incluimos autoplay por bloqueo de navegadores),
    // el usuario hace click en la tarjeta para activar el audio.
    player.src = `https://www.youtube.com/embed/${videoId}`;
    now.textContent = `🎶 Reproduciendo: ${songName}`;
  };

  // ---- Canvas fondo neón con partículas ----
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const particles = [];
  const COUNT = Math.floor((w*h) / 90000) + 40; // cantidad ajustada según pantalla

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function initParticles(){
    particles.length = 0;
    for(let i=0;i<COUNT;i++){
      particles.push({
        x: rand(0,w),
        y: rand(0,h),
        vx: rand(-0.25,0.25),
        vy: rand(-0.25,0.25),
        r: rand(0.8,3.2),
        glow: rand(8,28),
        hue: rand(310,345) // tonos rosa-magenta
      });
    }
  }

  initParticles();

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initParticles();
  }
  window.addEventListener('resize', resize);

  // Dibuja fondo degradado sutil (ya también presente en CSS)
  function drawBackground(){
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0, 'rgba(255,140,200,0.08)');
    g.addColorStop(0.5, 'rgba(255,115,190,0.06)');
    g.addColorStop(1, 'rgba(255,95,175,0.04)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);
  }

  function draw(){
    // suaviza el trazo para glow
    ctx.clearRect(0,0,w,h);
    drawBackground();

    // dibujar partículas con glow
    for(const p of particles){
      // movimiento
      p.x += p.vx;
      p.y += p.vy;

      // rebote suave en bordes
      if(p.x < -50) p.x = w + 50;
      if(p.x > w + 50) p.x = -50;
      if(p.y < -50) p.y = h + 50;
      if(p.y > h + 50) p.y = -50;

      // glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glow);
      grad.addColorStop(0, `hsla(${p.hue},95%,70%,0.95)`);
      grad.addColorStop(0.3, `hsla(${p.hue},95%,70%,0.35)`);
      grad.addColorStop(1, `hsla(${p.hue},95%,70%,0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  // start
  draw();

  // ---- accesibilidad: permitir reproducir con Enter cuando la card está enfocada ----
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        card.click();
      }
    });
  });
};
