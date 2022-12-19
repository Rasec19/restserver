const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT, esAdminRole} = require('../middlewares');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorías - publico
router.get('/', obtenerProductos);

// Obtener una categorá por id - publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

// Crear categoría - privado - cualquiera persona con un token valido
router.post('/', [ 
    validarJWT,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('categoria', 'No es un id de mongo').isMongoId(),
     check('categoria').custom( existeCategoriaPorId ),
     validarCampos, 
    ], crearProducto);

// Actulizar un registro por id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],actualizarProducto);

// Borra una categoría - ADMIN
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto);



module.exports = router;