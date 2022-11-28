const { response } = require("express");
const {  Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate

// obtenerCategoria - populate {}

const crearCategoria = async ( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    try {
        
        const categoriaDB = await Categoria.findOne({ nombre });

        if( categoriaDB ) {
            return res.status(400).json({
                msg: `La categoria ${ categoriaDB.nombre }, ya existe`
            });
        }

        // Generar la dat a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }
        
        const categoria = new Categoria(data);

        // Gaurdar DB
        await categoria.save();

        res.status(201).json(categoria);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo ha salido mal',
            error
        });
    }
};

// actualizarCategoria

//borrarCategoria - estado:false


module.exports = {
    crearCategoria,
};