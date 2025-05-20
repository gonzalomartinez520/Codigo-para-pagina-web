// Cargar noticias al inicio
document.addEventListener('DOMContentLoaded', cargarNoticiasParaAdmin);

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
    cordX: cordX,
    cordY: cordY,
    fecha: new Date().toLocaleString()
  };

  // Guardar en localStorage
  let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
  noticias.unshift(nuevaNoticia); // Agrega al principio
  localStorage.setItem('noticias', JSON.stringify(noticias));

  // Mostrar la nueva noticia
  mostrarNoticiasEnAdmin(nuevaNoticia);

  // Limpiar el formulario
  document.getElementById('titulo').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('cuerpo').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('tema').value = '';
  document.getElementById('cordX').value = '';
  document.getElementById('cordY').value = '';

  document.getElementById('uploadForm').reset();
  document.location.reload();
}