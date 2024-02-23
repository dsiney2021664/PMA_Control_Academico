const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeCursoById } = require('../helpers/db-validator');

const { cursosPost, cursosGet, cursosPut, cursosDelete } = require('../controllers/curso.controller');

const router = Router();

router.get("/", cursosGet);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursosPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursosDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos
    ], cursosPost);

module.exports = router; 