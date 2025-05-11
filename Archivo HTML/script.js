// Cargar noticias al inicio
document.addEventListener('DOMContentLoaded', cargarNoticias);

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
  mostrarNoticia(nuevaNoticia);

  // Limpiar el formulario
  document.getElementById('titulo').value = '';
  document.getElementById('descripcion').value = '';
  imagenInput.value = '';
  document.getElementById('cuerpo').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('tema').value = '';
}

function cargarNoticias() {
  const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
  noticias.forEach(noticia => mostrarNoticia(noticia));
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

  const descripcion = document.createElement('p');
  descripcion.textContent = noticia.descripcion;

  const cuerpo = document.createElement('p');
  cuerpo.textContent = noticia.cuerpo;

  const fecha = document.createElement('small');
  fecha.textContent = `Publicado el ${noticia.fecha}`;

  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.className = 'eliminar-btn';
  btnEliminar.onclick = () => eliminarNoticia(noticia);

  div.appendChild(titulo);
  div.appendChild(tema);
  div.appendChild(fecha);
  div.appendChild(descripcion);
  div.appendChild(img);
  div.appendChild(cuerpo);

  div.appendChild(btnEliminar);

  contenedor.appendChild(div);
}

function eliminarNoticia(noticia) {
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    noticias = noticias.filter(n => n.fecha != noticia.fecha);

    localStorage.setItem('noticias', JSON.stringify(noticias));

    document.getElementById('contenedor-noticias').innerHTML = '';
    cargarNoticias();
}