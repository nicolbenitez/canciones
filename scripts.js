// scripts.js
// Este archivo permite que los videos se reproduzcan en el reproductor superior
// cuando haces clic en las miniaturas de la galería.

const videoPlayer = document.getElementById("videoPlayer");
const nowPlaying = document.getElementById("nowPlaying");

// Selecciona todas las tarjetas de video
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const videoId = card.dataset.video;
    const title = card.dataset.title;

    // Cambia el video del iframe
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    // Actualiza el texto de "Reproduciendo"
    nowPlaying.textContent = `🎶 Reproduciendo: ${title}`;
  });
});

console.log("💖 Página musical de Nicol con reproductor integrada lista!");
