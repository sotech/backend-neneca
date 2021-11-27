//Aqui definir como se devuelve la info traida desde mongo

const Producto = require("../models/productoModel");
const ProductoValidacion = require('../api/productoValidaciones');

exports.agregarProducto = async payload => {
  const validacion = ProductoValidacion.validarProducto(payload)
  const respuesta = {}
  if(validacion.valido){
    const { nombre, descripcion, thumbnail, stock } = payload;
    const producto = {
      timestamp: new Date(),
      nombre,
      descripcion,
      thumbnail,
      stock
    };
    const nuevoProducto = await Producto.create(producto);
    respuesta.creado = true;
    respuesta.producto = nuevoProducto;
  }else{
    respuesta.creado = false;
    respuesta.errores = validacion.errores;
  }
  return respuesta
}

exports.obtenerProductos = async () => {
  const respuesta = {}
  const productos = await Producto.find({})

  if (productos) {
    
  }
}