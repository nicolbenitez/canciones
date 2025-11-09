/*
  scripts.js — Barbie Glam Deluxe
  - playVideo(id,title): cambia el iframe para reproducir la canción (click en tarjeta).
  - Play All: reproduce la lista en secuencia.
  - Canvas: fondo con brillos multicolor (luces que se mueven por toda la pantalla).
  - Entry: activa clase 'neon' después de la entrada para el parpadeo suave.
*/

window.onload = function() {
  // ---------- reproductor y playlist ----------
  const player = document.getElementById('player');
  const now = document.getElementById('now');

  // lista de canciones (puedes añadir más objetos con id y title)
  const playlist = [
    { id: 'sD9UX5_GiUc', title: 'Tu Boda — Óscar Maydon' },
    { id: 'SOh_BsKlajw', title: 'Suiza — Calle 24' },
    { id: '-uvIf9cSegE', title: 'Made For You — Jake Owen' },
    { id: 'p5Jw-T4dVss', title: 'That Should Be Me — Justin Bieber' },
    { id: 'GGQmKA15VCk', title: "What We Ain’t Got — Jake Owen" },
  ];

  // reproducir un video al hacer click (no forzamos autoplay global)
  window.playVideo = function(videoId, songName) {
    // Cambiamos src; muchos navegadores sólo reproducen si el usuario interactúa (click)
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    now.textContent = `🎶 Reproduciendo: ${songName}`;
  };

  // -------- Play All (secuencia simple) --------
  const playAllBtn = document.getElementById('playAll');
  let playAllIndex = 0;
  let playAllTimer = null;

  playAllBtn.addEventListener('click', () => {
    // inicia desde el primero
    playAllIndex = 0;
    startSequence();
  });

  function startSequence() {
    if (playAllTimer) {
      clearTimeout(playAllTimer);
      playAllTimer = null;
    }
    if (playAllIndex >= playlist.length) {
      playAllIndex = 0; // ciclo infinito (vuelve a empezar)
    }
    const item = playlist[playAllIndex];
    playVideo(item.id, item.title);
    playAllIndex++;

    // Estimación por canción: 210000ms (3m30s). 
    // Nota: esto es una aproximación; los usuarios pueden pausar o cambiar manualmente.
    playAllTimer = setTimeout(startSequence, 210000);
  }

  // permitir detener secuencia al cambiar manualmente
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      if (playAllTimer) { clearTimeout(playAllTimer); playAllTimer = null; }
    });
    // accesibilidad: play con Enter
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { card.click(); }
    });
  });

  // ---------- animación del título: activar neón después de entrada ----------
  const title = document.getElementById('nicol');
  setTimeout(() => { title.classList.add('neon'); }, 1400); // espera a que termine la entrada

  // ---------- Canvas: brillos multicolor por toda la pantalla ----------
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let lights = [];

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function createLights() {
    lights = [];
    const count = Math.floor((w * h) / 120000) + 45; // escala con resolución
    for (let i = 0; i < count; i++) {
      lights.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(1.2, 4.2),
        dx: rand(-0.6, 0.6),
        dy: rand(-0.6, 0.6),
        hue: rand(320, 360), // rosa-magenta hues
        sat: rand(60, 100),
        light: rand(60, 85),
        alpha: rand(0.25, 0.9),
        glow: rand(18, 56)
      });
    }
  }
  createLights();

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    createLights();
  }
  window.addEventListener('resize', resize);

  function drawBackground() {
    // fondo suave radial + overlay (ya en CSS pero lo reforzamos)
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0, 'rgba(255,120,185,0.12)');
    g.addColorStop(0.5, 'rgba(200,90,170,0.08)');
    g.addColorStop(1, 'rgba(140,40,110,0.06)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);
  }

  function draw() {
    ctx.clearRect(0,0,w,h);
    drawBackground();

    for (const p of lights) {
      // movimiento
      p.x += p.dx;
      p.y += p.dy;

      // rebote suave
      if (p.x < -60) p.x = w + 60;
      if (p.x > w + 60) p.x = -60;
      if (p.y < -60) p.y = h + 60;
      if (p.y > h + 60) p.y = -60;

      // gradiente glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glow);
      grad.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${p.alpha})`);
      grad.addColorStop(0.35, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${p.alpha * 0.45})`);
      grad.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
};
