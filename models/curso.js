const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Curso', CursoSchema);