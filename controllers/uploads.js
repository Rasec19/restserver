const { response, request } = require('express');
const { subirArchivo } = require('../helpers');


const cargarArchivo = async ( req = request, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No hay archivos que subir'});
    }

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



module.exports = {
    cargarArchivo
};