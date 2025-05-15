document.addEventListener('DOMContentLoaded', () => {
  cargarNoticias();

  // Escuchar cuando el usuario escribe en el buscador
  const buscador = document.getElementById('buscador');
  if (buscador) {
    buscador.addEventListener('input', () => {
      const termino = buscador.value.trim().toLowerCase();
      buscarTodasNoticias(termino);
    });
  }
});

function cargarNoticias() {
  const noticias = JSON.parse(localStorage.getItem('noticias')) || [];

  // Si no hay noticias, mostrar un mensaje
  if (noticias.length === 0) {
    const contenedor = document.getElementById('contenedor-noticias');
    const mensaje = document.createElement('p');
    mensaje.textContent = 'No hay noticias publicadas aún.';
    contenedor.appendChild(mensaje);
    return;
  }

  // Mostrar todas las noticias
  noticias.forEach(noticia => mostrarNoticias(noticia));
}

function buscarTodasNoticias(termino) {
  const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
  const resultados = noticias.filter(noticia =>
    noticia.tema.toLowerCase().includes(termino)
  );

  // Limpiar resultados anteriores
  const contenedor = document.getElementById('contenedor-noticias');
  contenedor.innerHTML = '';

  // Mostrar los resultados filtrados
  resultados.forEach(noticia => mostrarNoticias(noticia));
}

function mostrarNoticias(noticia) {
  const contenedor = document.getElementById('contenedor-noticias');

  const div = document.createElement('div');
  div.className = 'noticia';

  const titulo = document.createElement('h3');
  titulo.textContent = noticia.titulo;

  const tema = document.createElement('h4');
  tema.textContent = noticia.tema;

  const img = document.createElement('img');
  img.src = noticia.imagen;

  const descripcion = document.createElement('p');
  descripcion.textContent = noticia.descripcion;

  const fecha = document.createElement('small');
  fecha.textContent = `Publicado el ${noticia.fecha}`;

  div.appendChild(tema);
  div.appendChild(fecha);
  div.appendChild(img);
  div.appendChild(titulo);
  div.appendChild(descripcion);
 
  contenedor.appendChild(div);

  div.style.cursor = 'pointer';
  div.addEventListener('click', () => {
    window.location.href = `detalleNoticia.html?id=${noticia.id}`;
  });
}