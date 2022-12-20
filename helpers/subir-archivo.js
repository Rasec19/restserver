const path = require('path');
const fs   = require('fs');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        // Validar la extension
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`);
        }
        
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemp );
        });

    });
    
};

const limpiarImagenes = (modeloImg = '', coleccion = '') => {

    if ( modeloImg ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modeloImg );
        if (fs.existsSync( pathImagen )) {
            fs.unlinkSync( pathImagen );
        }
    }
};


module.exports = {
    subirArchivo,
    limpiarImagenes,
};