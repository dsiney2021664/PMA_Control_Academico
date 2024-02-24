const Curso = require('../models/curso');
const Alumno = require('../models/alumno');

const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({ id });
    if (existeCurso) {
        throw new Error(`El curso con el ${id} no existe `);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

const existeAlumnoById = async (id = '') => {
    const existeAlumno = await Alumno.findOne({ id });
    if (existeAlumno) {
        throw new Error(`El alumno con el ${id} no existe `);
    }
}

module.exports = {
    existeCursoById,
    existenteEmail,
    existeAlumnoById
}