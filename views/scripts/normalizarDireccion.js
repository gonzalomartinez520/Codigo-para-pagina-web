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