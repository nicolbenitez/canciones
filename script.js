/* scripts.js - Lógica de interacción
 - Maneja clicks en miniaturas
 - Filtrado por género/artista
 - Actualiza el reproductor principal (iframe)
*/

// Crea la URL embebida de YouTube a partir del video ID
function youtubeEmbedUrl(id){
  // autoplay=1 permitirá que empiece a reproducir al cargar (nota: algunos navegadores bloquean autoplay si no hay interacción)
  return `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&autoplay=1`;
}

// Inicializamos selectores
const mainPlayer = document.getElementById('main-player');
const nowTitle = document.getElementById('now-title');
const nowArtist = document.getElementById('now-artist');
const playButtons = document.querySelectorAll('.play');
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

// Función para cargar un video en el reproductor principal
function loadVideo(id, title, artist){
  mainPlayer.src = youtubeEmbedUrl(id);
  nowTitle.textContent = title;
  nowArtist.textContent = artist;
}

// Asignar evento a cada botón de reproducción (miniaturas)
playButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = btn.dataset.video;
    const title = btn.dataset.title || 'Canción';
    const artist = btn.dataset.artist || 'Artista';
    loadVideo(id, title, artist);
  });
});

// Filtrado simple: muestra/oculta tarjetas según data-genre o data-artist
filterButtons.forEach(fb => {
  fb.addEventListener('click', () => {
    // actualizar estado visual
    filterButtons.forEach(b=>b.classList.remove('active'));
    fb.classList.add('active');

    const filter = fb.dataset.filter;

    cards.forEach(card => {
      if(filter === 'all'){
        card.style.display = '';
        return;
      }

      // permitimos filtrar por "genre" o por artista-tag definidas en los botones
      const genre = card.dataset.genre || '';
      const artist = (card.dataset.artist || '').toLowerCase();

      if(filter === 'regional' || filter === 'pop' || filter === 'country'){
        card.style.display = (genre === filter) ? '' : 'none';
      } else if(filter.startsWith('artista')){
        // ejemplo: data-filter="artista-owen"
        const wanted = filter.split('-').slice(1).join(' ');
        card.style.display = artist.includes(wanted) ? '' : 'none';
      } else {
        // por defecto ocultar
        card.style.display = 'none';
      }
    });
  });
});

// Opcional: cargar primer video automáticamente (descomenta para autoload)
// const first = document.querySelector('.play'); if(first){ first.click(); }

// Nota: si quieres usar la API de iframe de YouTube para controlar play/pause/estado,
// se puede integrar cargando la API y usando postMessage. Aquí hemos optado por cambiar el src
// del iframe para mantener la solución simple y compatible.
