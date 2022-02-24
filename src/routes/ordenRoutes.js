//Usar las rutas para traer los distintos metodos de los controladores
const router = require("express").Router();
const { verificarToken } = require('../controllers/usuarioController');
const ordenController = require("../controllers/ordenController.js");

router.get('/obtener/:id', ordenController.obtenerOrden);
router.get('/obtener', verificarToken, ordenController.obtenerOrdenes);
router.post('/agregar', ordenController.agregarOrden);
router.put('/actualizar/:id', verificarToken, ordenController.actualizarOrden);
router.delete('/eliminar/:id', /*verificarToken,*/ ordenController.eliminarOrden);

module.exports = router;