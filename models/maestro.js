const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        require: [true, 'El apellido es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        require: [true, 'El password es obligatoria']
    },
    role: {
        type: String,
        default: "TEACHER_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Maestro', MaestroSchema);