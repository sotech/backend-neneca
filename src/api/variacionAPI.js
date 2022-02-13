const Variacion = require("../models/variacionModel");
const Producto = require("../models/productoModel");
const validaciones = require("../api/validaciones");

exports.agregarVariacion = async (id, payload) => {
  const respuesta = {};
  try {
    const validacion = validaciones.validarVariacion(payload);
    if (validacion.valido) {
      const producto = await Producto.findById(id);
      if(producto){
        const variacion = await Variacion.create(payload);
        producto.variaciones.push(variacion._id.valueOf());
        await producto.save();
  
        respuesta.agregado = true;
        respuesta.variacion = variacion;
      }else{
        respuesta.agregado = false;
        respuesta.error = "No se encontro el producto"
      }
      return respuesta;
    } else {
      respuesta.agregado = false;
      respuesta.error = validacion.errores;
      return respuesta;
    }
  } catch (err) {
    respuesta.agregado = false;
    respuesta.error = err;
    return respuesta;
  }
};

exports.obtenerVariacion = async(id) => {
  const respuesta = {};
  try{
    const variacion = await Variacion.findById(id);
    if(variacion){
      respuesta.variacion = variacion;
    }
  }
  catch(err){
    respuesta.error = err;
  }
  return respuesta;

}

exports.obtenerVariaciones = async(id) => {
  const respuesta = {
    error:'',
    variaciones:[]
  };
  try{
    const producto = await Producto.findById(id).populate({
      path: 'variaciones',
      model: 'Variacion'
    })
    if(producto){
      if(producto.variaciones.length > 0){
        respuesta.variaciones = [...producto.variaciones]
      }
    }else{
      respuesta.error = 'No se encontro el producto'
    }
  }catch(err){
    respuesta.error = err;
  }
  return respuesta
}

exports.actualizarVariacion = async (id,payload) => {
  const respuesta = {};
  try{
    await Variacion.updateOne(
      { _id: id },
      {
        $set: { ...payload },
      }
    );
    respuesta.actualizado = true;
  }catch(err){
    respuesta.actualizado = false;
    respuesta.error = err;
  }
  return respuesta
}

exports.eliminarVariacion = async (id) => {
  const respuesta = {};
  //Eliminar la variacion de la coleccion
  try {
    const varElim = await Variacion.findByIdAndDelete(id);
    if (!varElim) {
      respuesta.eliminado = false;
      respuesta.error = "No se encontro la variacion";
    } else {
      respuesta.eliminado = true;
      //Buscar los productos que tengan esa variacion y borrar la variacion de dichos productos
      const productos = await Producto.find();
      productos.map(async (p) => {
        const variacionesCount = p.variaciones.length;
        p.variaciones = p.variaciones.filter((v) => v != id);
        if (variacionesCount != p.variaciones.length) {
          await p.save();
        }
      });
    }
    return respuesta;
  } catch (err) {
    respuesta.eliminado = false;
    respuesta.error = err;
    return respuesta;
  }
};

exports.actualizarStock = async (id, cantidad) => {
  try {
    console.log(id);
    const variacion = await Variacion.findOne({ _id: id });
    
    const variacionActualizada = await Variacion.updateOne(
      { _id: id },
      {
        $set: { stock: variacion.stock - cantidad },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
