const { response, request } = require("express");
const {  Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
    
    try {
        const { limit = 5, desde = 0} = req.query;
        const query = { estado:true };

        const [ total, categorias ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario', 'nombre')
                .skip( Number(desde) )
                .limit( Number(limit) ),
        ]);

        res.status(200).json({
            total,
            categorias,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Erro en els ervidor al buscar categorias'
        });
    }

};

// obtenerCategoria - populate {}
const obtenerCategoria = async (req = request, res = response) => {
    
    try {

        const { id } = req.params;

        const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

        res.status(200).json({
            categoria
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Error del servidor al buscar categoria',
        });
    }

};

const crearCategoria = async ( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    try {
        
        const categoriaDB = await Categoria.findOne({ nombre });

        if( categoriaDB ) {
            return res.status(400).json({
                msg: `La categoria ${ categoriaDB.nombre }, ya existe`
            });
        }

        // Generar la data a guardar
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
const actualizarCategoria = async (req, res = response) => {

    try {
        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;
        
        data.nombre  = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Erro en el servidor al actualizar una categoria',
        });
    }

};

//borrarCategoria - estado:false
const borrarCategoria = async (req, res = response) => {
    
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );

        res.status(200).json(categoria);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Error en el servidor al eliminar una categoria',
        });
    }

};


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
};