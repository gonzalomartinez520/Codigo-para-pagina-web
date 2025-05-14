document.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search);
      const noticiaId = params.get('id');

      const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
      const noticia = noticias.find(n => n.id === noticiaId);

      const contenedor = document.getElementById('detalle-noticia');

      if (noticia) {
        const div = document.createElement('div');
        div.className = 'noticia';

        div.innerHTML = `
          <h1>${noticia.titulo}</h1>
          <h4>${noticia.tema}</h4>
          <p><strong></strong> ${noticia.fecha}</p>
          <img src="${noticia.imagen}"/>
          <p><strong></strong> ${noticia.descripcion}</p>
          <p><strong></strong> ${noticia.cuerpo}</p>
        `; 
        /*En esta parte, se pasan las coordenadas de la noticia al mapa, y se muestra el mapa*/

        contenedor.appendChild(div);
      } else {
        contenedor.textContent = 'Noticia no encontrada.';
      }
    });