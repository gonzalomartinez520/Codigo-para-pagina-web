const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.get("/",(req,res)=>{
  console.log(__dirname)
  res.sendFile(__dirname + "/views/admin.html")
})
// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });


// Middleware para servir archivos estáticos (para poder ver las imágenes subidas si querés)
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'views')));

// Servir el main.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin.html"));
});

app.get('/panelNoticias', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'panelNoticias.html'));
});

app.get('/detalleNoticia', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'detalleNoticia.html'));
});

app.get('/inicioSesion', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'inicioSesion.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'registro.html'));
});

// Ruta para subir imagen
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se subió ninguna imagen.' });
  }

  res.status(200).json({
    message: 'Imagen subida correctamente.',
    filePath: '/uploads/' + req.file.filename
  });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});