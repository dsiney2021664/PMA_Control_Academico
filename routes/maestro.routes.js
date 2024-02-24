const { Router } = require('express');
const { check } = require('express-validator');

const { existenteEmail } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { maestroPost } = require('../controllers/maestro.controller');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("apellido", "El apellido es obligatorio").not().isEmpty(),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6, }),
        validarCampos,
    ], maestroPost);

module.exports = router;