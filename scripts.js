window.onload = function () {
  // 🎵 Reproductor de YouTube
  window.playVideo = function (videoId, songName) {
    const player = document.getElementById("player");
    const currentSong = document.getElementById("current-song");
    player.src = `https://www.youtube.com/embed/${videoId}`;
    currentSong.textContent = `🎶 Reproduciendo: ${songName}`;
  };

  // 🌸 Fondo animado con partículas
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

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,150,200,0.4)";
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
