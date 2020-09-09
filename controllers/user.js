const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { createJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

    const from = Number(req.query.from) || 0;
    const items = Number(req.query.items) || 5;

    try 

        const [ users, total ] = await Promise.all([
            User
                .find({}, 'name email role google img')
                .skip(from)
                .limit(items),
            User.countDocuments()
        ]);

        res.json({
            ok: true,
            users,
            total
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar logs.'
        });

    }
    
};

const createUser = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {
        const emailExists = await User.findOne({ email });

        if ( emailExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            });
        }

        const user = new User(req.body);

        // Cifrar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        //Guardar Usuario
        await user.save();

        const token = await createJWT( user._id );

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar logs.'
        });

    }

}

const updateUser = async (req, res = response) => {
    // TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;

    try {
        
        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                 ok: false,
                 msg: 'Usuario no encontrado. '
            });
        }

        const { password, google, email, ...fieldsToUpdate } = req.body;
    

        if (userDB.email !== email) {

            const emailExists = await User.findOne( { email } );
            if (emailExists) {
                return res.status(404).json({
                    ok: false,
                    msg: `El email ${req.body.email} ya está registrado.`
                });
            }

        }
        fieldsToUpdate.email = email;
        const updatedUser = await User.findByIdAndUpdate( uid, fieldsToUpdate, { new: true } );

        res.json({
            ok: true,
            user: updatedUser
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar logs.'
        });

    }

}

const deleteUser = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado.'
            });
        }

        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'    
        }); 

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar logs.'
        });

    }

}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}