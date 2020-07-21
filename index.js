require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express(); // Se crea el servidor express

app.use(cors()); // Configuración CORS

dbConnection(); // BD

// Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        message: 'Hola Mundo'
    });

})

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});