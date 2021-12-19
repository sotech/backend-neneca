//Usar las rutas para traer los distintos metodos de los controladores
const router = require("express").Router();
const {verificarToken} = require('../controllers/usuarioController');
const productoController = require("../controllers/productoController");

router.get('/obtener', productoController.obtenerProductos);
router.post('/agregar', verificarToken, productoController.agregarProducto);
router.put('/actualizar/:id', verificarToken, productoController.actualizarProducto);
router.delete('/eliminar/:id', verificarToken, productoController.eliminarProducto);
router.get('/buscar', productoController.buscarProductos);

module.exports = router;