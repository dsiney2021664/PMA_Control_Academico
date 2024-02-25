const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth'
        this.cursosPath = '/api/cursos';
        this.alumnosPath = '/api/alumnos';
        this.maestroPath = '/api/maestros';


        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.cursosPath, require('../routes/curso.routes'));
        this.app.use(this.alumnosPath, require('../routes/alumno.routes'))
        this.app.use(this.maestroPath, require('../routes/maestro.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutado y escuchando en el puerto', this.port);
        });
    }
}

module.exports = Server;