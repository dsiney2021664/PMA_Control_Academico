const { generarJWT } = require("../helpers/generar-jwt");
const Alumno = require("../models/alumno");
const bycriptjs = require('bcryptjs');

const login = async (req, res) => {
    const { correo, password} = req.body;

    try{
        // verificar que el correo exista
        const alumno = await Alumno.findOne({ correo });

        console.log(alumno)
        if(!alumno){
            return res.status(400).json({
                msg: 'El correo no está registrado'
            })
        }

        // verificar si el alumno está activo
        if(!alumno.estado){
            return res.status(400).json({
                msg: 'El alumno no existe en la base de datos'
            })
        }
        // verificar que la contraseña sea la correcta
        const validPassword = bycriptjs.compareSync(password, alumno.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            })
        }

        const token = await generarJWT(alumno.id);

        res.status(200).json({
            msg: 'Login ok',
            alumno,
            token
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: 'Comuniquese con el admin'
        })
    }
}

module.exports = {
    login
};