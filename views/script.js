// Cargar noticias al inicio

document.addEventListener('DOMContentLoaded', cargarTodasNoticias);

function publicarNoticia() {
  const titulo = document.getElementById('titulo').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const imagenURL = document.getElementById("imagenURL").value.trim();
  const tema = document.getElementById('tema').value.trim();
  const cuerpo = document.getElementById('cuerpo').value.trim();
  const cordY = document.getElementById('cordY').value.trim();
  const cordX = document.getElementById('cordX').value.trim();
  

  if (!titulo || !descripcion || !tema ||!cuerpo) {
    alert('Por favor, llena los campos obligatorios.');
    return;
  }

  
  // Verificar si se cargó una imagen
  if (!imagenURL) {
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
    latitud: cordX,
    longitud: cordY,
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
  document.getElementById('cuerpo').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('tema').value = '';
  document.getElementById('cordX').value = '';
  document.getElementById('cordY').value = '';

  document.getElementById('uploadForm').reset();
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

function normalizar(){
  const data = document.getElementById('direccion').value.trim();
  const outputElement = document.getElementById('recibir-direccion');
  
  const urlConVariables = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${data}`;

// Make a GET request
fetch(urlConVariables)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(urlConVariables);
    const datos =  response.json();
    console.log(datos);
    return datos;

  })
  .then(data => {
    outputElement.textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}