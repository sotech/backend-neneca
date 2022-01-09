//Aqui definir como se devuelve la info traida desde mongo

const Producto = require("../models/productoModel");
const validaciones = require("../api/validaciones");

exports.agregarProducto = async (payload) => {
  const validacion = validaciones.validarProducto(payload);
  const respuesta = {};
  if (validacion.valido) {
    const {
      nombre,
      descripcion,
      thumbnail,
      stock,
      categoria,
      image,
      precio,
      tags,
    } = payload;
    const producto = {
      timestamp: new Date(),
      nombre: nombre ? nombre : null,
      descripcion: descripcion ? descripcion : null,
      thumbnail: thumbnail ? thumbnail : null,
      categoria: categoria ? categoria : null,
      stock: stock ? stock : null,
      image: image ? image : null,
      precio: precio ? precio : null,
      tags: tags ? tags : null,
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
    const productoEliminado = await Producto.deleteOne({ _id: id });
    respuesta.eliminado = true;
  } catch (err) {
    respuesta.eliminado = false;
    respuesta.error = { error: err };
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

exports.actualizarStock = async (id, cantidad) => {
  try {
    const producto = await Producto.findOne({ _id: id });

    const productoActualizado = await Producto.updateOne(
      { _id: id },
      {
        $set: { stock: producto.stock - cantidad },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
