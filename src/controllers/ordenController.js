//Usar el API para resolver los distintos endpoints

const ordenAPI = require('../api/ordenAPI')

exports.agregarOrden = async (req, res) => {
  try {
    const payload = req.body;
    const respuesta = await ordenAPI.agregarOrden(payload);
    if (respuesta.creado) {
      res.status(201).json({ msg: 'Orden agregada', data: respuesta.orden })
    } else {
      res.status(400).json({ error: respuesta.errores })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.obtenerOrdenes = async (req, res) => {
  try {
    const respuesta = await ordenAPI.obtenerOrdenes()
    if (respuesta.ordenes) {
      res.status(200).json({ data: respuesta.ordenes })
    } else {
      res.status(404).json({ error: respuesta.error })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.obtenerOrden = async (req, res) => {
  try {
    const {id} = req.params;
    const respuesta = await ordenAPI.obtenerOrden(id)
    if (respuesta.orden) {
      res.status(200).json({ data: respuesta.orden })
    } else {
      res.status(404).json({ error: respuesta.error })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.actualizarOrden = async (req, res) => {
  const payload = req.body
  const id = req.params.id
  try {
    const respuesta = await ordenAPI.actualizarOrden(payload, id)
    if (respuesta.actualizado) {
      res.status(200).json({ msg: 'Orden actualizada', data: respuesta.orden })
    } else {
      res.status(400).json({ error: respuesta.error })
    }

  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.eliminarOrden = async (req, res) => {
  const id = req.params.id

  try {
    const respuesta = await ordenAPI.eliminarOrden(id)
    if (respuesta.eliminado) {
      res.status(200).json({ msg: 'Orden eliminada' })
    } else {
      res.status(400).json({ error: respuesta.error })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}