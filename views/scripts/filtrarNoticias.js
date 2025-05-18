function filtrarNoticias(termino) {
  const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
  const resultados = noticias.filter(noticia =>
    noticia.tema.toLowerCase().includes(termino)
  );

  // Limpiar resultados anteriores
  const contenedor = document.getElementById('contenedor-noticias');
  contenedor.innerHTML = '';

  // Mostrar los resultados filtrados
  resultados.forEach(noticia => mostrarNoticiasEnPanel(noticia));
}
