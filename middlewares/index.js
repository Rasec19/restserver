

const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarArcihvo = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArcihvo,
};