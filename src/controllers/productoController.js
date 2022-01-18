//Usar el API para resolver los distintos endpoints

const productoAPI = require('../api/productoAPI')

exports.agregarProducto = async (req, res) => {
  try {
    const payload = req.body;
    const respuesta = await productoAPI.agregarProducto(payload);
    if (respuesta.creado) {
      res.status(201).json({ msg: 'Producto agregado', data: respuesta.producto })
    } else {
      res.status(400).json({ error: respuesta.errores })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.obtenerProductos = async (req, res) => {
  try {
    const respuesta = await productoAPI.obtenerProductos()
    if (respuesta.productos) {
      res.status(200).json({ data: respuesta.productos })
    } else {
      res.status(400).json({ error: respuesta.error })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.actualizarProducto = async (req, res) => {
  const payload = req.body
  const id = req.params.id
  try {
    const respuesta = await productoAPI.actualizarProducto(payload, id)
    if (respuesta.actualizado) {
      res.status(200).json({ msg: 'Producto actualizado', data: respuesta.producto })
    } else {
      res.status(400).json({ error: respuesta.error })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.obtenerProductoPorId = async (req,res) => {
  const id = req.params.id

  try {
    const respuesta = await productoAPI.obtenerProductoPorId(id)
    if (respuesta.producto) {
      res.status(200).json({data:respuesta.producto})
    } else {
      res.status(404).json({ error: respuesta.error })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.eliminarProducto = async (req, res) => {
  const id = req.params.id

  try {
    const respuesta = await productoAPI.eliminarProducto(id)
    if (respuesta.eliminado) {
      res.status(200).json({msg: 'Producto eliminado'})
    } else {
      res.status(404).json({ error: respuesta.error })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.buscarProductos = async (req, res) => {
  const query = req.query.nombre

  try {
    const respuesta = await productoAPI.buscarProductos(query)
    if (respuesta.resultado.length) {
      res.status(200).json({ respuesta: respuesta.resultado })
    } else {
      res.status(400).json({ msg: 'No se encontraron resultados que coincidan con los parámetros de búsqueda' })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}