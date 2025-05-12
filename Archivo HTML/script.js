// Cargar noticias al inicio
document.addEventListener('DOMContentLoaded', cargarTodasNoticias);

function publicarNoticia() {
  const titulo = document.getElementById('titulo').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const imagenInput = document.getElementById('foto');
  const imagenFile = imagenInput.files[0];
  const tema = document.getElementById('tema').value.trim();
  const cuerpo = document.getElementById('cuerpo').value.trim();
  const direccion = document.getElementById('direccion').value.trim();

  if (!titulo || !descripcion || !tema ||!cuerpo) {
    alert('Por favor, llena los campos.');
    return;
  }

  let imagenURL = '';
  
  // Verificar si se cargó una imagen
  if (imagenFile) {
    imagenURL = URL.createObjectURL(imagenFile); // Crear URL de la imagen
  }
  else {
    alert('Por favor, agregue una imagen');
    return;
  }
  
  const nuevaNoticia = {
    id: Date.now().toString(),
    titulo: titulo,
    descripcion: descripcion,
    imagen: imagenURL,
    tema: tema,
    cuerpo: cuerpo,
    direccion: direccion,
    fecha: new Date().toLocaleString()
  };

  // Guardar en localStorage
  let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
  noticias.unshift(nuevaNoticia); // Agrega al principio
  localStorage.setItem('noticias', JSON.stringify(noticias));

  // Mostrar la nueva noticia
  mostrarNoticias(nuevaNoticia);

  // Limpiar el formulario
  document.getElementById('titulo').value = '';
  document.getElementById('descripcion').value = '';
  imagenInput.value = '';
  document.getElementById('cuerpo').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('tema').value = '';
}

function cargarTodasNoticias() {
  const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
  noticias.forEach(noticia => mostrarNoticias(noticia));
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

  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.className = 'eliminar-btn';
  btnEliminar.onclick = (e) => {
    e.stopPropagation();
    eliminarNoticia(noticia);
  };
  
  div.appendChild(tema);
  div.appendChild(fecha);
  div.appendChild(img);
  div.appendChild(titulo);
  div.appendChild(descripcion);

  div.appendChild(btnEliminar);

  contenedor.appendChild(div);
  
  div.style.cursor = 'pointer';
  div.addEventListener('click', () => {
    window.location.href = `detalleNoticia.html?id=${noticia.id}`;
  });
}

function eliminarNoticia(noticia) {
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    noticias = noticias.filter(n => n.fecha != noticia.fecha);

    localStorage.setItem('noticias', JSON.stringify(noticias));

    document.getElementById('contenedor-noticias').innerHTML = '';
    cargarTodasNoticias();
}