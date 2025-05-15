document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que se recargue la página

  const formData = new FormData();
  const fileInput = document.getElementById('imageInput');
  formData.append('image', fileInput.files[0]);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message); // Acá muestra el mensaje sin cambiar de página
    document.getElementById('imagenURL').value = data.filePath;
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error al subir la imagen.');
  });
});