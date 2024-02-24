const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Maestro = require('../models/maestro');

const maestroPost = async (req, res) => {
    const { nombre, apellido, correo, password, role, estado} = req.body;
    const maestro = new Maestro({ nombre, apellido, correo, password, role, estado });

    const salt = bcryptjs.genSaltSync();
    maestro.password = bcryptjs.hashSync(password, salt);

    await maestro.save();

    res.status(200).json({
        maestro,
    });
}

module.exports = {
    maestroPost
}