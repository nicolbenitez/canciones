// Fondo con brillos animados + efecto de sonido al clic
window.onload = function() {
  const player = document.getElementById('player');
  const now = document.getElementById('now');
  const ping = document.getElementById('pingSound');

  // Reproducir canción seleccionada
  window.playVideo = function(videoId, songName) {
    ping.currentTime = 0;
    ping.play(); // efecto de sonido
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    now.textContent = `🎶 Reproduciendo: ${songName}`;
  };

  // Fondo de brillos
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let lights = [];

  function rand(min, max){ return Math.random()*(max-min)+min; }

  function createLights(){
    lights = [];
    const count = Math.floor((w*h)/120000)+60;
    for(let i=0;i<count;i++){
      lights.push({
        x:Math.random()*w,
        y:Math.random()*h,
        z:rand(0.2,1.2),
        r:rand(1,4),
        dx:rand(-0.5,0.5),
        dy:rand(-0.5,0.5),
        hue:rand(300,400),
        sat:rand(70,100),
        light:rand(60,90),
        alpha:rand(0.25,0.9)
      });
    }
  }

  createLights();

  window.addEventListener('resize', ()=>{
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    createLights();
  });

  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of lights){
      p.x += p.dx * p.z;
      p.y += p.dy * p.z;
      if(p.x<0) p.x=w;
      if(p.x>w) p.x=0;
      if(p.y<0) p.y=h;
      if(p.y>h) p.y=0;

      const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*20);
      grad.addColorStop(0,`hsla(${p.hue},${p.sat}%,${p.light}%,${p.alpha})`);
      grad.addColorStop(1,`hsla(${p.hue},${p.sat}%,${p.light}%,0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
};
