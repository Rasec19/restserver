const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT } = require('../middlewares');

const { crearCategoria } = require('../controllers/categorias');

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
router.post('/', [ 
    validarJWT,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     validarCampos, 
    ], crearCategoria);

// Actulizar un registro por id - privado - cualquiera con token valido
router.put('/:id', (req, res) => {
    res.json('PUT')
});

// Borra una categoría - ADMIN
router.delete('/:id', (req, res) => {
    res.json('DELETE')
});



module.exports = router;