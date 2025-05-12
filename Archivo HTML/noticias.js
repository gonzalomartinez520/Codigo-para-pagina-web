document.addEventListener('DOMContentLoaded', () => {
  cargarNoticias();

  // Escuchar cuando el usuario escribe en el buscador
  const buscador = document.getElementById('buscador');
  if (buscador) {
    buscador.addEventListener('input', () => {
      const termino = buscador.value.trim().toLowerCase();
      buscarNoticias(termino);
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
  noticias.forEach(noticia => mostrarNoticia(noticia));
}

function buscarNoticias(termino) {
  const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
  const resultados = noticias.filter(noticia =>
    noticia.tema.toLowerCase().includes(termino)
  );

  // Limpiar resultados anteriores
  const contenedor = document.getElementById('contenedor-noticias');
  contenedor.innerHTML = '';

  // Mostrar los resultados filtrados
  resultados.forEach(noticia => mostrarNoticia(noticia));
}

function mostrarNoticia(noticia) {
  const contenedor = document.getElementById('contenedor-noticias');

  const div = document.createElement('div');
  div.className = 'noticia';

  const titulo = document.createElement('h3');
  titulo.textContent = noticia.titulo;

  const tema = document.createElement('h5');
  tema.textContent = noticia.tema;

  const direccion = document.createElement('h5');/*Estas dos lineas de codigo tendrian que utilizar los dos servicios para mostrar la ubicacion en el mapa (normalizar y graficar)*/
  direccion.textContent = noticia.direccion;

  const img = document.createElement('img');
  img.src = noticia.imagen;

  const cuerpo = document.createElement('p');
  cuerpo.textContent = noticia.cuerpo;

  const descripcion = document.createElement('p');
  descripcion.textContent = noticia.descripcion;

  const fecha = document.createElement('small');
  fecha.textContent = `Publicado el ${noticia.fecha}`;

  div.appendChild(titulo);
  div.appendChild(tema);
  div.appendChild(fecha);
  div.appendChild(descripcion);
  div.appendChild(img);
  div.appendChild(cuerpo);

  contenedor.appendChild(div);
}
