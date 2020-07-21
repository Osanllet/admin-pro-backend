require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Se crea el servidor express
const app = express();

// Configuración CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// BD
dbConnection();

// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});