// scripts.js
// 🎧 Control del reproductor y animación de burbujas musicales 💖

const videoPlayer = document.getElementById("videoPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const cards = document.querySelectorAll(".card");
const bubblesContainer = document.getElementById("bubbles");

// Cambiar video al hacer clic
cards.forEach(card => {
  card.addEventListener("click", () => {
    const videoId = card.dataset.video;
    const title = card.dataset.title;

    // Cambia el video del iframe con autoplay
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    nowPlaying.textContent = `🎶 Reproduciendo: ${title}`;
  });
});

// 🌸 Crear burbujas musicales animadas
function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // Posición aleatoria
  bubble.style.left = Math.random() * 100 + "vw";
  bubble.style.animationDuration = 6 + Math.random() * 4 + "s";

  // A veces mostrar una nota musical 🎵
  bubble.textContent = Math.random() > 0.5 ? "🎵" : "💗";

  bubblesContainer.appendChild(bubble);

  // Eliminar después de la animación
  setTimeout(() => {
    bubble.remove();
  }, 10000);
}

// Crear burbujas cada medio segundo
setInterval(createBubble, 600);

// Estilos dinámicos de burbujas
const style = document.createElement("style");
style.textContent = `
  .bubble {
    position: absolute;
    bottom: -40px;
    font-size: 20px;
    opacity: 0.7;
    animation: floatUp linear forwards;
  }
  @keyframes floatUp {
    0% { transform: translateY(0); opacity: 0.8; }
    100% { transform: translateY(-110vh); opacity: 0; }
  }
`;
document.head.appendChild(style);

console.log("🌸 Página musical de Nicol cargada con burbujas animadas y reproductor activo!");
