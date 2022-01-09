//Usar las rutas para traer los distintos metodos de los controladores
const router = require("express").Router();
const {verificarToken} = require('../controllers/usuarioController');
const upload = require('../utils/multer');
const productoController = require("../controllers/productoController");

router.get('/obtener', productoController.obtenerProductos);
router.post('/agregar', verificarToken, upload.single('image'), productoController.agregarProducto);
router.put('/actualizar/:id', verificarToken, upload.single('image'), productoController.actualizarProducto);
router.delete('/eliminar/:id', verificarToken, productoController.eliminarProducto);
router.get('/buscar', productoController.buscarProductos);

module.exports = router;