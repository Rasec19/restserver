const path = require('path');

const { response, request } = require('express');


const cargarArchivo = ( req = request, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No hay archivos que subir'});
    }

    const { archivo } = req.files;

    const uploadPath = path.join( __dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err)
        return res.status(500).json({err});

        res.status(201).json({msg: `File uploaded! ${uploadPath}`});
    });
};



module.exports = {
    cargarArchivo
};