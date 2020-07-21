const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        fieldValidator
    ],
    login);

module.exports = router;