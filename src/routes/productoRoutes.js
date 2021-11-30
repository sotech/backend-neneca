//Usar las rutas para traer los distintos metodos de los controladores
const router = require("express").Router();
const productoController = require("../controllers/productoController.js");

router.get('/obtener', productoController.obtenerProductos);
router.post('/agregar', productoController.agregarProducto);
router.put('/actualizar/:id', productoController.actualizarProducto);
router.delete('/eliminar/:id', productoController.eliminarProducto);

module.exports = router;