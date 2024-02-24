const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarCursos } = require('../middlewares/validar-cursos');
const { existenteEmail, existeAlumnoById } = require('../helpers/db-validator');

const { alumnosDelete, alumnosGet, alumnosPost, alumnosPut } = require('../controllers/alumno.controller');

const router = Router();

router.get("/", alumnosGet);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], alumnosPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], alumnosDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("apellido", "El apellido es obligatorio").not().isEmpty(),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6, }),
        check("cursos"),
        validarCampos,
        validarCursos,
    ], alumnosPost);

module.exports = router;
