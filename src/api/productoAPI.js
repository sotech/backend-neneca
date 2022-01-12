//Aqui definir como se devuelve la info traida desde mongo

const Producto = require("../models/productoModel");
const validaciones = require("../api/validaciones");
const variacionAPI = require("../api/variacionAPI");

exports.agregarProducto = async (payload) => {
  const validacion = validaciones.validarProducto(payload);
  const respuesta = {};
  if (validacion.valido) {
    const { nombre, descripcion, categoria, tags } = payload;
    const producto = {
      timestamp: new Date(),
      nombre: nombre ? nombre : null,
      descripcion: descripcion ? descripcion : null,
      categoria: categoria ? categoria : null,
      tags: tags ? tags : null,
      variaciones: [],
    };
    const nuevoProducto = await Producto.create(producto);
    respuesta.creado = true;
    respuesta.producto = nuevoProducto;
  } else {
    respuesta.creado = false;
    respuesta.errores = validacion.errores;
  }
  return respuesta;
};

exports.obtenerProductos = async () => {
  const respuesta = {};
  const productos = await Producto.find({});

  if (productos.length) {
    respuesta.productos = productos;
  } else {
    respuesta.error = "No hay productos cargados";
  }
  return respuesta;
};

exports.actualizarProducto = async (payload, id) => {
  const respuesta = {};
  try {
    let productoActualizado = await Producto.updateOne(
      { _id: id },
      {
        $set: { ...payload },
      }
    );
    productoActualizado = {
      timestamp: new Date(),
      ...productoActualizado,
    };
    respuesta.actualizado = true;
    respuesta.producto = productoActualizado;
  } catch (err) {
    respuesta.actualizado = false;
    respuesta.error = { error: err };
  }

  return respuesta;
};

exports.eliminarProducto = async (id) => {
  const respuesta = {};
  try {
    const producto = await Producto.findById(id);
    if (producto) {
      //Eliminar todas las variaciones
      producto.variaciones.forEach(async (v) => {
        await variacionAPI.eliminarVariacion(v._id);
      });
      const productoEliminado = await Producto.deleteOne({ _id: id });
      respuesta.eliminado = true;
    } else {
      respuesta.eliminado = false;
      respuesta.error = "No se encontro el producto";
    }
  } catch (err) {
    respuesta.eliminado = false;
    respuesta.error = err;
  }

  return respuesta;
};

exports.buscarProductos = async (query) => {
  const respuesta = {};

  try {
    const resultado = await Producto.find({
      $or: [{ nombre: new RegExp(`${query}`, "i") }, { tags: query }],
    }).exec();

    respuesta.resultado = resultado;
  } catch (err) {
    respuesta.error = { error: err };
  }
  return respuesta;
};
