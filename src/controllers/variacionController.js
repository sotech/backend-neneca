const variacionAPI = require('../api/variacionAPI');
const fs = require('fs');
const path = require('path');

exports.obtenerVariacionesDelProducto = async (req, res) => {

}
exports.agregarVariacionAlProducto = async (req, res) => {
    const id = req.params.idProducto;
    const payload = req.body;
    try {
        const respuesta = await variacionAPI.agregarVariacion(id,payload)
        if (respuesta.agregado) {
          res.status(200).json({msg: 'Variacion agregada', data:respuesta.variacion})
        } else {
          res.status(400).json({ error: respuesta.error })
        }
      } catch (err) {
        res.status(500).json({ error: err })
      }
}
exports.actualizarVariacion = async (req, res) => {
    
}
exports.eliminarVariacion = async (req, res) => {
    const id = req.params.idVariacion
    try {
        const respuesta = await variacionAPI.eliminarVariacion(id)
        if (respuesta.eliminado) {
          res.status(200).json({msg: 'Variacion eliminada'})
        } else {
          res.status(400).json({ error: respuesta.error })
        }
      } catch (err) {
        res.status(500).json({ error: err })
      }
}