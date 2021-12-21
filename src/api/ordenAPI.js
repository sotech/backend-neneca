//Aqui definir como se devuelve la info traida desde mongo

const Orden = require("../models/ordenModel");
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
    const nuevaOrden = await Orden.create(orden);
    respuesta.creado = true;
    respuesta.orden = nuevaOrden;
  } else {
    respuesta.creado = false;
    respuesta.errores = validacion.errores;
  }
  return respuesta
}

exports.obtenerOrden = async (id) => {
  const respuesta = {}
  const orden = await Orden.findById(id).populate({
    path: 'pedidos.item',
    model: 'Producto'
  })

  if (orden) {
    respuesta.orden = orden
  } else {
    respuesta.error = 'No se encontro la orden con id: ' + id
  }
  return respuesta
}

exports.obtenerOrdenes = async () => {
  const respuesta = {}
  const ordenes = await Orden.find({}).populate({
    path:'pedidos.item',
    model:'Producto'
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

    const ordenEliminada = await Orden.deleteOne({ "_id": id })
    respuesta.eliminado = true
  } catch (err) {
    respuesta.eliminado = false
    respuesta.error = { error: err }
  }

  return respuesta
}