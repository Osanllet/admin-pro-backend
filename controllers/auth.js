const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { createJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'USUARIO y/o contraseña incorrecta.'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario y/o CONTRASEÑA incorrecta.'
            });
        }

        // Generar Token
        const token = await createJWT( userDB._id );

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Error inesperado.Revisar logs.'
        });
    }

}

const renewJWT = async (req, res = response) => {

    const uid = req.uid;

    const token = await createJWT( uid );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    login,
    renewJWT
};