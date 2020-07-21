const mongoose = require('mongoose');

const dbConnection = async() => {
    
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Base de datos online.');

    } catch (error) {
        console.log(error)
        throw new mongoose.Error('Error al iniciar la BD, favor de revisar los logs.');
    }

}

module.exports = {
    dbConnection
}