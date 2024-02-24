const Curso = require('../models/curso');

const validarCursos = async (req, res, next) => {
    const { nombreCurso } = req.body;

   let cursosVistos = {};
    for (let i = 0; i < nombreCurso.length; i++) {
        if (cursosVistos[nombreCurso[i]]) {
            return res.status(400).json({msg: `Ya te has asignado al curso de ${nombreCurso[i]}`});
        } else {
            cursosVistos[nombreCurso[i]] = true;
        }
    }
    if (nombreCurso.length > 3) {
        return res.status(400).json({
            msg: 'No te puedes asignar a más de 3 cursos'
        });
    }

    for (let i = 0; i < nombreCurso.length; i++) {
        const curso = await Curso.findOne({ nombre: nombreCurso[i] });
        if (!curso) {
            return res.status(400).json({ msg: "Ingrese un curso valido" });
        }
    }



    next();
};

module.exports = {
    validarCursos
};