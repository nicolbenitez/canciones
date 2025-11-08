// ========================
// Crear miniaturas y reproductores
// ========================
let players = [];
const videoContainers = document.querySelectorAll('.video-container');
let activeVideo = null;

videoContainers.forEach((container, index) => {
    // Crear imagen y título
    const img = document.createElement('img');
    img.src = container.dataset.img;
    const title = document.createElement('div');
    title.className = 'title';
    title.innerText = container.dataset.title;
    container.appendChild(img);
    container.appendChild(title);

    // Reproducir video al hacer clic
    container.addEventListener('click', () => {
        container.innerHTML = ''; // Quitar miniatura
        players[index] = new YT.Player(container, {
            height: '220',
            width: '100%',
            videoId: container.dataset.id,
            playerVars: { 'rel':0,'modestbranding':1 },
            events: { 'onStateChange': onPlayerStateChange }
        });
    });
});

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) activeVideo = event.target;
    else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) activeVideo = null;
}

// ========================
// Filtro por género
// ========================
const videos = [
    { id:'your_video_id1', genre:'pop', img:'https://i.ytimg.com/vi/your_video_id1/hqdefault.jpg', title:'Tu Boda'},
    { id:'your_video_id2', genre:'rock', img:'https://i.ytimg.com/vi/your_video_id2/hqdefault.jpg', title:'Suiza'},
    { id:'your_video_id3', genre:'balada', img:'https://i.ytimg.com/vi/your_video_id3/hqdefault.jpg', title:'We Owen'},
    { id:'your_video_id4', genre:'pop', img:'https://i.ytimg.com/vi/your_video_id4/hqdefault.jpg', title:'That Should Be Me'},
    { id:'your_video_id5', genre:'rock', img:'https://i.ytimg.com/vi/your_video_id5/hqdefault.jpg', title:'Canción 5'},
    { id:'your_video_id6', genre:'balada', img:'https://i.ytimg.com/vi/your_video_id6/hqdefault.jpg', title:'Canción 6'}
];

function filterVideos(genre) {
    const container = document.querySelector('.filtered-videos');
    container.innerHTML = '';
    const filtered = videos.filter(v => v.genre===genre);
    filtered.forEach(v=>{
        const div = document.createElement('div');
        div.className = 'video-container';
        div.dataset.id = v.id;
        div.dataset.img = v.img;
        div.dataset.title = v.title;
        container.appendChild(div);

        // Miniatura y título
        const img = document.createElement('img');
        img.src = v.img;
        const title = document.createElement('div');
        title.className = 'title';
        title.innerText = v.title;
        div.appendChild(img);
        div.appendChild(title);

        // Reproducir al clic
        div.addEventListener('click', () => {
            div.innerHTML = '';
            new YT.Player(div, {
                height: '220',
                width: '100%',
                videoId: v.id,
                playerVars: { 'rel':0,'modestbranding':1 },
                events: { 'onStateChange': onPlayerStateChange }
            });
        });
    });
}

// ========================
// Partículas animadas
// ========================
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*3+1;
        this.speed = Math.random()*0.5+0.2;
        this.color = `hsl(${Math.random()*360},70%,60%)`;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(active) {
        this.y -= this.speed + (active?2:0);
        if(this.y<0) this.y = canvas.height;
        this.draw();
    }
}

let particles = [];
for(let i=0;i<150;i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const active = activeVideo != null;
    particles.forEach(p=>p.update(active));
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
