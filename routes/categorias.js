const { Router, response } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignin } = require('../controllers/auth');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorías - publico
router.get('/', (req, res) => {
    res.json('GET')
});

// Obtener una categorá por id - publico
router.get('/:id', (req, res) => {
    res.json('GET - id')
});

// Crear categoría - privado - cualquiera persona con un token valido
router.post('/', (req, res) => {
    res.json('POST')
});

// Actulizar un registro por id - privado - cualquiera con token valido
router.put('/:id', (req, res) => {
    res.json('PUT')
});

// Borra una categoría - ADMIN
router.delete('/:id', (req, res) => {
    res.json('DELETE')
});



module.exports = router;