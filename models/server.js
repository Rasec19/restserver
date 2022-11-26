const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
        };

        //* Conectar a base de datos
        this.conectarDB();

        //* Middlewares
        this.middlewares();

        //* Routes
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use( express.json() );

        //¨* Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion en http://localhost:${this.port}`)
        });
    }


}






module.exports = Server;