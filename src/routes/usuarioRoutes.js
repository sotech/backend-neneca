//Usar las rutas para traer los distintos metodos de los controladores
const router = require("express").Router();
const usuarioController = require("../controllers/usuarioController.js");

router.post('/login',usuarioController.loginUsuario);
//Posiblemente esta ruta haya que quitarla luego
router.post('/registrar',usuarioController.crearUsuario);

module.exports = router;