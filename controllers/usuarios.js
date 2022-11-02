const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, contraseña, rol } );

    //* Encriptrar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync( contraseña, salt );

    //* Guardar en DB
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usuariosPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
    usuariosPut
};