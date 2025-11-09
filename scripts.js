window.onload = function(){
  const player = document.getElementById('player');
  const now = document.getElementById('now');

  const playlist = [
    {id:'sD9UX5_GiUc', title:'Tu Boda — Óscar Maydon'},
    {id:'SOh_BsKlajw', title:'Suiza — Calle 24'},
    {id:'-uvIf9cSegE', title:'Made For You — Jake Owen'},
    {id:'p5Jw-T4dVss', title:'That Should Be Me — Justin Bieber'},
    {id:'GGQmKA15VCk', title:"What We Ain’t Got — Jake Owen"},
  ];
  let current = 0;

  window.playVideo = function(id,title){
    player.src=`https://www.youtube.com/embed/${id}?autoplay=1`;
    now.textContent=`🎶 Reproduciendo: ${title}`;
  };

  // Botón Play All
  document.getElementById('playAll').addEventListener('click',()=>{
    current = 0;
    playNext();
  });

  function playNext(){
    if(current >= playlist.length) current = 0;
    playVideo(playlist[current].id, playlist[current].title);
    current++;
    // Duración promedio 3:30 -> 210000 ms
    setTimeout(playNext,210000);
  }

  // Fondo luces tipo discoteca
  const c = document.getElementById('bgCanvas');
  const ctx = c.getContext('2d');
  let w,h;
  const lights=[];
  function resize(){
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    lights.length=0;
    for(let i=0;i<50;i++){
      lights.push({
        x:Math.random()*w,
        y:Math.random()*h,
        r:Math.random()*3+2,
        dx:(Math.random()-0.5)*0.8,
        dy:(Math.random()-0.5)*0.8,
        color:`hsl(${Math.random()*30+320},100%,70%)`
      });
    }
  }
  window.addEventListener('resize',resize);
  resize();

  function draw(){
    ctx.clearRect(0,0,w,h);
    const grd=ctx.createRadialGradient(w/2,h/2,100,w/2,h/2,h/1.2);
    grd.addColorStop(0,'#ff66b2');
    grd.addColorStop(1,'#b30086');
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,w,h);

    for(const p of lights){
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      const glow=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
      glow.addColorStop(0,p.color);
      glow.addColorStop(1,'transparent');
      ctx.fillStyle=glow;
      ctx.fill();
      p.x+=p.dx;
      p.y+=p.dy;
      if(p.x<0||p.x>w)p.dx*=-1;
      if(p.y<0||p.y>h)p.dy*=-1;
    }
    requestAnimationFrame(draw);
  }
  draw();
};
