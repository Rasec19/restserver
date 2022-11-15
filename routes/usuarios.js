
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPost, usuariosPatch, usuariosDelete, usuariosPut } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contraseña', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    check('correo').custom( emailExiste ),
    validarCampos,
],usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);






module.exports = router;