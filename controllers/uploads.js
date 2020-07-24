const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require('../helpers/update-img');

const fileUpload = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id

    const validTypes = [ 'hospitals', 'medics', 'users' ];
    const validExtensions = ['png', 'jpg', 'jpeg'];

    try {

        if (!validTypes.includes(type)) {
            return res.status(400).json({
                ok: false,
                msg: 'El parámetro type es incorrecto.'
            });
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400)
                .json({
                    ok: false,
                    msg: 'No hay ningún archivo para subir.'
                });
        }

        // Procesar imagen
        const file = req.files.imagen;
        // Extension
        const imgNameSplitted = file.name.split('.');
        const extension = imgNameSplitted[imgNameSplitted.length - 1];

        // Validar extension
        if (!validExtensions.includes(extension)) {
            return res.status(400)
                .json({
                    ok: false,
                    msg: 'No es un tipo de archivo válido (png, jpg o jpeg).'
                });
        }

        // Genera nombre archivo
        const fileName = `${uuidv4()}.${extension}`;
        // Genera path
        const filePath = `./uploads/${type}/${fileName}`;

        // Mover imagen
        file.mv(filePath, async(err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover la imagen.'
                });
            }
            
            const imgSaved = await updateImg(type, id, fileName, filePath);

            if ( !imgSaved ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El archivo no pudo ser almacenado en BD.'
                })
            }

            res.json({
                ok: true,
                msg: 'Archivo guardado correctamente.',
                fileName
            });
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar los logs.'
        });
    }

}

const getImage = (req, res = response) => {
    const type = req.params.type;
    const img = req.params.img;

    const imgPath = path.join( __dirname, `../uploads/${ type }/${ img }` );

    if ( !fs.existsSync( imgPath ) ) {
        return res.sendFile( path.join(__dirname, `../uploads/no-img.jpg`) );
    }

    res.sendFile( imgPath );
}

module.exports = {
    fileUpload,
    getImage
}