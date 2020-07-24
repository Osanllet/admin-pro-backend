const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/jwt-validator');

const { login, renewJWT } = require('../controllers/auth');

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        fieldValidator
    ],
    login);

router.get('/renew', validateJWT, renewJWT);

module.exports = router;