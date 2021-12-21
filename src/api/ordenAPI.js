//Aqui definir como se devuelve la info traida desde mongo

const Orden = require("../models/ordenModel");
const productoAPI = require("./productoAPI")
const Producto = require("../models/productoModel")
const validaciones = require("./validaciones");
const ORDEN_ESTADOS = require('./ordenEstados');

exports.agregarOrden = async payload => {
  const validacion = validaciones.validarOrden(payload)

  const respuesta = {}
  if (validacion.valido) {
    const { pedidos } = payload;
    const orden = {
      timestamp: new Date(),
      pedidos,
      estado: ORDEN_ESTADOS.INCOMPLETO
    };
    try {
      const nuevaOrden = await Orden.create(orden);
      nuevaOrden.pedidos.forEach(async pedido => {
        const stockActualizado = await productoAPI.actualizarStock(pedido.item, pedido.cantidad)
      })
      respuesta.creado = true;
      respuesta.orden = nuevaOrden;


    } catch (err) {
      respuesta.creado = false
      respuesta.errores = err
    }

  } else {
    respuesta.creado = false;
    respuesta.errores = validacion.errores;
  }
  return respuesta
}

exports.obtenerOrdenes = async () => {
  const respuesta = {}
  const ordenes = await Orden.find({}).populate({
    path: 'pedidos.item',
    model: 'Producto'
  })

  if (ordenes.length) {
    respuesta.ordenes = ordenes
  } else {
    respuesta.error = 'No hay ordenes cargadas'
  }
  return respuesta
}

exports.actualizarOrden = async (payload, id) => {
  const respuesta = {}
  const validacion = validaciones.validarOrden(payload)
  try {
    if (validacion.valido) {
      let ordenActualizada = await Orden.updateOne({ "_id": id },
        {
          $set: { ...payload }
        })
      ordenActualizada = {
        timestamp: new Date(),
        ...ordenActualizada
      }
      respuesta.actualizado = true
      respuesta.orden = ordenActualizada
    } else {
      respuesta.actualizado = false
      respuesta.error = validacion.errores
    }

  } catch (err) {
    respuesta.actualizado = false
    respuesta.error = { error: err }
  }


  return respuesta
}

exports.eliminarOrden = async id => {
  const respuesta = {}

  try {
    const orden = await Orden.findOne({ "_id": id })
    const ordenEliminada = await Orden.deleteOne({ "_id": id })
    orden.pedidos.forEach(async pedido => {
      const stockActualizado = await productoAPI.actualizarStock(pedido.item, -pedido.cantidad)
    })
    respuesta.eliminado = true
  } catch (err) {
    respuesta.eliminado = false
    respuesta.error = { error: err }
  }

  return respuesta
}