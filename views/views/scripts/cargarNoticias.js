function cargarNoticiasParaPanel() {
  const noticias = JSON.parse(localStorage.getItem('noticias')) || [];

  // Si no hay noticias, mostrar un mensaje
  if (noticias.length === 0) {
    const contenedor = document.getElementById('contenedor-noticias');
    const mensaje = document.createElement('h5');
    mensaje.textContent = 'No hay noticias publicadas aún.';
    contenedor.appendChild(mensaje);
    return;
  }

  // Mostrar todas las noticias
  noticias.forEach(noticia => mostrarNoticiasEnPanel(noticia));
}

function cargarNoticiasParaAdmin() {
  const noticias = JSON.parse(localStorage.getItem('noticias')) || [];

  // Si no hay noticias, mostrar un mensaje
  if (noticias.length === 0) {
    const contenedor = document.getElementById('contenedor-noticias');
    const mensaje = document.createElement('h5');
    mensaje.textContent = 'No hay noticias publicadas aún.';
    contenedor.appendChild(mensaje);
    return;
  }

  // Mostrar todas las noticias
  noticias.forEach(noticia => mostrarNoticiasEnAdmin(noticia));
}