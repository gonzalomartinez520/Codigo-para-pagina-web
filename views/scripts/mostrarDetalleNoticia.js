document.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search);
      const noticiaId = params.get('id');

      const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
      const noticia = noticias.find(n => n.id === noticiaId);

      const contenedor = document.getElementById('detalle-noticia');

      if (noticia) {

        const tieneMapa = noticia.cordY && noticia.cordX;
        contenedor.className = tieneMapa ? 'detalle-flex' : 'detalle-centrado';

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
        contenedor.appendChild(div);

        if(tieneMapa) {
          const mapaDiv = document.createElement('div');
          mapaDiv.id = 'map';
          contenedor.appendChild(mapaDiv);

          const map = L.map('map').setView([noticia.cordY, noticia.cordX], 14);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          L.marker([noticia.cordY, noticia.cordX]).addTo(map);
        }

      } else {
        contenedor.textContent = 'Noticia no encontrada.';
      }
    });