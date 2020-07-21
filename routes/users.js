/*
    Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/', validateJWT , getUsers);
router.post('/',
    [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('password', 'La contraseña es obligatoria.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        fieldValidator
    ],
    createUser );
router.put('/:id',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        fieldValidator
    ],
    updateUser);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;