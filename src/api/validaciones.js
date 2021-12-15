const ORDEN_ESTADOS = require('./ordenEstados')

exports.validarProducto = (data) => {
  const validacion = {
    errores:"",
    valido:true
  };
  //Nombre
  if(!data.nombre){
    validacion.errores += "NOMBRE faltante";
    validacion.valido = false;
  }
  if(!data.stock){
    validacion.errores += "STOCK faltante";
    validacion.valido = false;
  }
  return validacion
}

exports.validarOrden = (data) =>{
  const validacion = {
    errores: "",
    valido: true
  };
  //Estado
  if(data.estado){
    let existe = false
    for(const e in ORDEN_ESTADOS){
      if (ORDEN_ESTADOS[e] === data.estado){
        existe = true
      }
    }
    if(!existe){
      validacion.valido = false;
      validacion.errores += "El estado no es un estado valido"
    }
  }
  return validacion
}