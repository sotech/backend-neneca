//Usar las rutas para traer los distintos metodos de los controladores
const router = require("express").Router();
const {verificarToken} = require('../controllers/usuarioController');
const upload = require('../utils/multer');
const variacionController = require("../controllers/variacionController");

router.get('/obtener/:idProducto', variacionController.obtenerVariacionesDelProducto);
router.get('/obtenerVariacion/:idVariacion', variacionController.obtenerVariacion);
router.post('/agregar/:idProducto', verificarToken, upload.single('image'), variacionController.agregarVariacionAlProducto);
router.put('/actualizar/:idVariacion', verificarToken, upload.single('image'), variacionController.actualizarVariacion);
router.delete('/eliminar/:idVariacion', verificarToken, variacionController.eliminarVariacion);

module.exports = router;