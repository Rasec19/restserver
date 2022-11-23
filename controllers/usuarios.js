const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    
    const { limit = 5, desde = 0 } = req.query; 
    const query = {estado: true};

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number(desde) )
            .limit( Number(limit) )
    ]);

    res.status(200).json({
        total,
        usuarios
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

    res.status(201).json({usuario});
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, contraseña, google, correo,...resto } = req.body;

    // TODOD: validar contra base de datos
    if ( contraseña ) {
        //* Encriptrar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync( contraseña, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({usuario});
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json(usuario);
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
    usuariosPut
};