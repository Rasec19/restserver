const path = require('path');
const fs   = require('fs');

const { response, request } = require('express');
const { subirArchivo, limpiarImagenes }      = require('../helpers');

const { Usuario, Producto } = require('../models');


const cargarArchivo = async ( req = request, res = response ) => {

    try {

        // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.status(201).json({
            nombre,
        });

    } catch (msg) {
        res.status(400).json({msg});
    }
};

const actualizarImagen = async ( req = request, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        
        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
    
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
    }

    //Limpiar imagenes previas
    limpiarImagenes(modelo.img, coleccion);

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();


    res.json( modelo );
};



module.exports = {
    cargarArchivo,
    actualizarImagen,
};