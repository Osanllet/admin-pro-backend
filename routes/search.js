/*
    Todo
    Ruta: /api/all
 */


const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt-validator');

const { searchWhole, searchByCollection } = require('../controllers/search');

const router = Router();

router.get('/:term', validateJWT, searchWhole);
router.get('/collection/:collection/:term', validateJWT, searchByCollection);

module.exports = router;