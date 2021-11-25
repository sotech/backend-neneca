exports.validarProducto = (data) => {
  const validacion = {
    errores:"",
    valido:true
  };
  //Nombre
  if(!data.nombre){
    validacion.errores += "NOMBRE faltante\n";
    validacion.valido = false;
  }
  if(!data.stock){
    validacion.errores += "STOCK faltante\n";
    validacion.valido = false;
  }
  return validacion
}