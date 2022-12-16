const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT } = require('../middlewares');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorías - publico
router.get('/', obtenerCategorias);

// Obtener una categorá por id - publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria);

// Crear categoría - privado - cualquiera persona con un token valido
router.post('/', [ 
    validarJWT,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     validarCampos, 
    ], crearCategoria);

// Actulizar un registro por id - privado - cualquiera con token valido
router.put('/:id', [
    // validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria);

// Borra una categoría - ADMIN
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
], borrarCategoria);



module.exports = router;