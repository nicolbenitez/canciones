// scripts.js — Fondo con brillos multicolor + reproducción YouTube
window.onload = function() {
  const player = document.getElementById('player');
  const now = document.getElementById('now');

  window.playVideo = function(videoId, songName) {
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    now.textContent = `🎶 Reproduciendo: ${songName}`;
  };

  // Fondo con brillos
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let lights = [];

  function rand(min, max){ return Math.random()*(max-min)+min; }
  function createLights(){
    lights = [];
    const count = Math.floor((w*h)/120000)+45;
    for(let i=0;i<count;i++){
      lights.push({
        x:Math.random()*w,
        y:Math.random()*h,
        r:rand(1.2,4.2),
        dx:rand(-0.6,0.6),
        dy:rand(-0.6,0.6),
        hue:rand(320,400),
        sat:rand(60,100),
        light:rand(60,85),
        alpha:rand(0.25,0.9),
        glow:rand(18,56)
      });
    }
  }
  createLights();
  window.addEventListener('resize',()=>{
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
    createLights();
  });

  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of lights){
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<-60)p.x=w+60;
      if(p.x>w+60)p.x=-60;
      if(p.y<-60)p.y=h+60;
      if(p.y>h+60)p.y=-60;
      const grad=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.glow);
      grad.addColorStop(0,`hsla(${p.hue},${p.sat}%,${p.light}%,${p.alpha})`);
      grad.addColorStop(1,`hsla(${p.hue},${p.sat}%,${p.light}%,0)`);
      ctx.fillStyle=grad;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
};
