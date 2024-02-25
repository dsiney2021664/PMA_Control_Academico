const jwt = require("jsonwebtoken");
const Alumno = require("../models/alumno");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    //verificación de token
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //leer el usuario que corresponde al uid
    const alumno = await Alumno.findById(uid);
    //verificar que el usuario exista.
    if (!alumno) {
      return res.status(401).json({
        msg: "Alumno no existe en la base de datos",
      });
    }
    //verificar si el uid está habilidato.
    if (!alumno.estado) {
      return res.status(401).json({
        msg: "Token no válido - alumno con estado:false",
      });
    }

    req.alumno = alumno;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Token no válido",
      });
  }
};

module.exports = {
  validarJWT,
};