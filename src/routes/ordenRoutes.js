//Usar las rutas para traer los distintos metodos de los controladores
const router = require("express").Router();
const ordenController = require("../controllers/ordenController.js");

router.get('/obtener', ordenController.obtenerOrdenes);
router.post('/agregar', ordenController.agregarOrden);
router.put('/actualizar/:id', ordenController.actualizarOrden);
router.delete('/eliminar/:id', ordenController.eliminarOrden);

module.exports = router;