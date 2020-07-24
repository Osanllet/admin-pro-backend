/*
    Hospitales
    Ruta: /api/hospitals 
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/jwt-validator');

const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital');

const router = Router();

router.get('/', validateJWT, getHospitals );

router.post('/', [
    validateJWT,
    check('name', 'El nombre es requerido.').not().isEmpty(),
    fieldValidator
], createHospital);

router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es requerido.').not().isEmpty(),
    fieldValidator
], updateHospital);

router.delete('/:id', validateJWT, deleteHospital);

module.exports = router;