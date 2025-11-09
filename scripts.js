/* scripts.js
 - playVideo(id,title): cambia el iframe (usuario hizo click -> se reproduce)
 - ping sound al seleccionar
 - canvas: brillos multicolor animados por toda la pantalla
 - accesibilidad: permite navegar con teclado
*/

window.onload = function() {
  const player = document.getElementById('player');
  const now = document.getElementById('now');
  const ping = document.getElementById('pingSound');

  // Reproducir canción al hacer click en la lista
  window.playVideo = function(videoId, songName) {
    // sonido de clic (si está cargado)
    if (ping) {
      try { ping.currentTime = 0; ping.play(); } catch(e){ /* ignore */ }
    }
    // Cambiar video (autoplay porque fue interacción del usuario)
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    now.textContent = `🎶 Reproduciendo: ${songName}`;
  };

  // Hacer foco/Enter reproducir para items (accesibilidad)
  document.querySelectorAll('.list-item').forEach(btn => {
    btn.setAttribute('tabindex','0');
    btn.addEventListener('keydown',(e)=>{
      if(e.key === 'Enter' || e.key === ' ') { btn.click(); }
    });
  });

  // ---------------- Canvas: brillos multicolor ----------------
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let lights = [];

  function rand(min,max){ return Math.random()*(max-min)+min; }

  function createLights(){
    lights = [];
    const count = Math.floor((w*h) / 130000) + 60;
    for(let i=0;i<count;i++){
      lights.push({
        x: Math.random()*w,
        y: Math.random()*h,
        z: rand(0.3,1.2),
        r: rand(1.2,4.2),
        dx: rand(-0.6,0.6),
        dy: rand(-0.6,0.6),
        hue: rand(300,380), // rosa / magenta hues
        sat: rand(60,100),
        light: rand(60,85),
        alpha: rand(0.18,0.9),
        glow: rand(18,56)
      });
    }
  }
  createLights();

  window.addEventListener('resize', ()=> {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    createLights();
  });

  function drawBackground(){
    // sutil overlay para profundidad
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'rgba(255,120,185,0.08)');
    g.addColorStop(0.6,'rgba(200,80,160,0.06)');
    g.addColorStop(1,'rgba(140,40,110,0.04)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);
  }

  function render(){
    ctx.clearRect(0,0,w,h);
    drawBackground();
    for(const p of lights){
      p.x += p.dx * p.z;
      p.y += p.dy * p.z;

      if(p.x < -60) p.x = w + 60;
      if(p.x > w + 60) p.x = -60;
      if(p.y < -60) p.y = h + 60;
      if(p.y > h + 60) p.y = -60;

      const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.glow);
      grad.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${p.alpha})`);
      grad.addColorStop(0.35, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${p.alpha * 0.45})`);
      grad.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(render);
  }
  render();
};
