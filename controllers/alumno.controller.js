const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');

const alumnosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, alumnos] = await Promise.all([
            Alumno.countDocuments(query),
            Alumno.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('cursos')
        ]);

        res.status(200).json({
            total,
            alumnos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener alumnos' });
    }

}

const alumnosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, correo, role, estado, ...resto } = req.body;

    try {
        const alumno = await Alumno.findById(id).populate('cursos');
        if (nombreCurso && alumno.cursos.some(curso => curso.nombre === nombreCurso)) {
            return res.status(400).json({
                msg: 'No te puedes asignar al mismo curso'
            });

        }
        await Alumno.findByIdAndUpdate(id, resto);

        const alumnoActualizado = await Alumno.findById({ _id: id });

        res.status(200).json({
            msg: 'Alumno Actualizado correctamente',
            alumno: alumnoActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al actualizar"
        })
    }

}

const alumnosDelete = async (req, res) => {
    const { id } = req.params;
    await Alumno.findByIdAndUpdate(id, { estado: false });

    const alumno = await Alumno.findOne({ _id: id });
    const alumnoAutenticado = req.alumno;

    res.status(200).json({
        msg: "Alumno a eliminar",
        alumno,
        alumnoAutenticado
    });
}

const alumnosPost = async (req, res) => {
    const { nombre } = req.body;
    const alumno = new Alumno({ nombre });


    await alumno.save();
    res.status(200).json({
        alumno
    });
}

module.exports = {
    alumnosGet,
    alumnosPut,
    alumnosDelete,
    alumnosPost
}