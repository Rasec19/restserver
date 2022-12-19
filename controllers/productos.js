const { response, request } = require("express");
const {  Producto } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
    
    try {
        const { limit = 5, desde = 0} = req.query;
        const query = { estado:true };

        const [ total, productos ] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .skip( Number(desde) )
                .limit( Number(limit) ),
        ]);

        res.status(200).json({
            total,
            productos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Erro en el servidor al buscar productos'
        });
    }

};

// obtenerCategoria - populate {}
const obtenerProducto = async (req = request, res = response) => {
    
    try {

        const { id } = req.params;

        const producto = await Producto.findById(id)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');

        res.status(200).json({
            producto
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Error del servidor al buscar un producto',
        });
    }

};

const crearProducto = async ( req, res = response ) => {

    const { estado, usuario, ...body } = req.body;

    try {
        
        const productoDB = await Producto.findOne({ nombre: body.nombre });

        if( productoDB ) {
            return res.status(400).json({
                msg: `El producto ${ productoDB.nombre }, ya existe`
            });
        }

        // Generar la data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }
 
        const producto = new Producto(data);

        // Gaurdar DB
        await producto.save();

        res.status(201).json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo ha salido mal al crear un producto',
            error
        });
    }
};

// actualizarCategoria
const actualizarProducto = async (req, res = response) => {

    try {
        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;

        if( data.nombre ) {
            data.nombre = data.nombre.toUpperCase();
        }
        
        data.usuario = req.usuario._id;

        const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Erro en el servidor al actualizar un producto',
        });
    }

};

//borrarCategoria - estado:false
const borrarProducto = async (req, res = response) => {
    
    try {
        const { id } = req.params;

        const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true } );

        res.status(200).json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Error en el servidor al eliminar un producto',
        });
    }

};


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
};