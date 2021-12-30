const {estadoValido} = require('./ordenEstados')

exports.validarProducto = (data) => {
  const validacion = {
    errores:"",
    valido:true
  };
  //Nombre
  if(!data.nombre){
    validacion.errores += "Falta nombre";
    validacion.valido = false;
  }
  if (!data.precio) {
    validacion.errores += "Falta precio";
    validacion.valido = false;
  }
  if(!data.stock){
    validacion.errores += "Falta stock";
    validacion.valido = false;
  }
  return validacion
}

exports.validarUsuario = (data) => {
  const validacion = {
    errores: "",
    valido: true
  };
  if(!data.username){
    validacion.valido = false;
    validacion.errores += "Falta username"
  } 
  if (!data.email) {
    validacion.valido = false;
    validacion.errores += "Falta email"
  } 
  if (!data.password) {
    validacion.valido = false;
    validacion.errores += "Falta password"
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
    //Validar estado unicamente si es que existe
    if(!estadoValido(data.estado)){
      validacion.valido = false;
      validacion.errores += "El estado no es un estado valido"
    }
  }
  //Datos personales
  if(!data.nombre_comprador){
    validacion.valido = false;
    validacion.errores += "Falta nombre_comprador"
  }
  if(!data.direccion_envio){
    validacion.valido = false;
    validacion.errores += "Falta direccion_envio"
  }
  if (!data.email_comprador) {
    validacion.valido = false;
    validacion.errores += "Falta email_comprador"
  }
  if (!data.pedidos){
    validacion.valido = false;
    validacion.errores += "Falta pedidos"
  }
  return validacion
}