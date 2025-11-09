window.onload = function () {
  // 🎵 Cambiar video al hacer clic
  window.playVideo = function (videoId, songName) {
    const player = document.getElementById("player");
    const currentSong = document.getElementById("current-song");
    player.src = `https://www.youtube.com/embed/${videoId}`;
    currentSong.textContent = `🎶 Reproduciendo: ${songName}`;
  };

  // 💫 Fondo animado con partículas rosadas
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  let w, h;
  let particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,192,203,0.6)";
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
};
