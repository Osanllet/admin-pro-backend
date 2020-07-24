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
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/medics', require('./routes/medics'));
app.use('/api/all', require('./routes/search'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});