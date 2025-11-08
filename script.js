// Videos por género
const videos = [
    { id: 'your_video_id1', genre: 'pop' },
    { id: 'your_video_id2', genre: 'rock' },
    { id: 'your_video_id3', genre: 'balada' },
    { id: 'your_video_id4', genre: 'pop' },
    { id: 'your_video_id5', genre: 'rock' },
    { id: 'your_video_id6', genre: 'balada' },
];

function filterVideos(genre) {
    const container = document.querySelector('.filtered-videos');
    container.innerHTML = '';
    videos.filter(v => v.genre === genre).forEach(v => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${v.id}`;
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        container.appendChild(iframe);
    });
}

// ===================
// Visualizador musical con partículas
// ===================
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const audio = document.getElementById('audioPlayer');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
let source;

// Crear fuente de audio al reproducir
audio.onplay = () => {
    if (!source) {
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 256;
    }
};

// Partículas
class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.color = `hsl(${Math.random()*360}, 70%, 60%)`;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(freq) {
        this.y -= this.speed + freq*0.1;
        if (this.y < 0) this.y = canvas.height;
        this.draw();
    }
}

let particles = [];
for (let i=0;i<150;i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    const avgFreq = dataArray.reduce((a,b)=>a+b,0)/dataArray.length;

    particles.forEach(p => p.update(avgFreq));
    requestAnimationFrame(animate);
}

animate();

// Ajustar canvas al tamaño de ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
