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
  //Datos personales
  if(!data.nombre_comprador){
    validacion.valido = false;
    validacion.errores += "Falta ingresar nombre del comprador"
  }
  if(!data.direccion_envio){
    validacion.valido = false;
    validacion.errores += "Falta ingresar direccion de envio"
  }
  if (!data.email_comprador) {
    validacion.valido = false;
    validacion.errores += "Falta ingresar email del comprador"
  }
  return validacion
}