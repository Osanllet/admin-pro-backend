/*
    Médicos
    Ruta: /api/medics
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/jwt-validator');

const { 
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic } = require('../controllers/medic');

const router = Router();

router.get('/', validateJWT, getMedics);
router.post('/', [
    validateJWT,
    check('name', 'El nombre es requerido.').not().isEmpty(),
    check('hospital', 'El ID del hospital debe ser válido.').isMongoId(),
    fieldValidator
], createMedic);
router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es requerido.').not().isEmpty(),
    check('hospital', 'El ID del hospital debe ser válido.').isMongoId(),
    fieldValidator
], updateMedic);
router.delete('/:id', validateJWT, deleteMedic);

module.exports = router;