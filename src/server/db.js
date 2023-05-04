const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

db.connect();

// Configurar tus rutas y middleware de Express aquí

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});