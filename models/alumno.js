const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
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
    cursos:
        [{ type: Schema.Types.ObjectId, ref: 'Curso' }],
    role: {
        type: String,
        default: "STUDENT_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    }
});

AlumnoSchema.methods.toJSON = function(){
    const { __v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
}

module.exports = model('Alumno', AlumnoSchema);