const Variacion = require("../models/variacionModel");
const Producto = require('../models/productoModel');
const validaciones = require("../api/validaciones");

exports.agregarVariacion = async (id,payload) => {
    const respuesta = {};
    try{
        const validacion = validaciones.validarVariacion(payload)
        if(validacion.valido){
            const variacion = await Variacion.create(payload);
            const producto = await Producto.findById(id);
            try{
                producto.variaciones.push(variacion._id.valueOf());
                await producto.save()
            }catch(err){
                console.log(err);
            }
            respuesta.agregado = true;
            respuesta.variacion = variacion;
            return respuesta
        }else{
            respuesta.agregado = false;
            respuesta.error = validacion.errores
            return respuesta
        }
    }catch(err){
        respuesta.agregado = false;
        respuesta.error = err;
        return respuesta
    }
}

exports.eliminarVariacion = async id =>{
    const respuesta = {};
    //Eliminar la variacion de la coleccion
    try{
        await Variacion.findByIdAndDelete(id);
        //Buscar los productos que tengan esa variacion y borrar la variacion de dichos productos
        const productos = await Producto.find()
        productos.map(async p => {
            const variacionesCount = p.variaciones.length;
            p.variaciones = p.variaciones.filter(v => v != id);
            if (variacionesCount != p.variaciones.length){
                await p.Save()
            }
        })
        respuesta.eliminado = true;
        return respuesta;
    }catch(err){
        respuesta.eliminado = false;
        respuesta.error = err;
        return respuesta;
    }
}