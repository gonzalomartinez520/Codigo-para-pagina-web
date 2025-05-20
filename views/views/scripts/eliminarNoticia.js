function eliminarNoticia(noticia) {
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    noticias = noticias.filter(n => n.fecha != noticia.fecha);

    localStorage.setItem('noticias', JSON.stringify(noticias));

    document.getElementById('contenedor-noticias').innerHTML = '';
    cargarNoticiasParaAdmin();
}