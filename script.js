// Videos y géneros
const videos = [
    { id: 'your_video_id1', genre: 'pop' },
    { id: 'your_video_id2', genre: 'rock' },
    { id: 'your_video_id3', genre: 'balada' },
    { id: 'your_video_id4', genre: 'pop' },
    { id: 'your_video_id5', genre: 'rock' },
    { id: 'your_video_id6', genre: 'balada' },
];

// Filtrado de videos por género
function filterVideos(genre) {
    const container = document.querySelector('.filtered-videos');
    container.innerHTML = '';
    const filtered = videos.filter(v => v.genre === genre);
    filtered.forEach(v => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${v.id}`;
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        container.appendChild(iframe);
    });
}

// Fondo animado con gradiente dinámico
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradientShift = 0;

function drawBackground() {
    gradientShift += 0.002; // velocidad del gradiente
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${gradientShift*360 % 360}, 70%, 50%)`);
    gradient.addColorStop(1, `hsl(${(gradientShift*360 + 60) % 360}, 80%, 45%)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(drawBackground);
}

drawBackground();

// Ajustar canvas al cambiar tamaño de ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
