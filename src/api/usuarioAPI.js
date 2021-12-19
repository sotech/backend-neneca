const Usuario = require('../models/usuarioModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validaciones = require('./validaciones');

exports.login = async(user) => {
  const respuesta = {
    logeado:true,
    error:'',
    token:''
  }
  const userDB = await Usuario.findOne({username:user.username})
  if(!userDB){
    respuesta.logeado = false;
    respuesta.error = 'Error al logear. Usuario no encontrado'
    return respuesta;
  }
  if (!await bcrypt.compare(user.password,userDB.password)){
    respuesta.logeado = false;
    respuesta.error = 'Error al logear. Contraseña incorrecta'
    return respuesta;
  }
  //Usuario existe y contraseña correcta, generar token
  const payload = {
    id:userDB._id,
    username:userDB.username
  };
  const token = await jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_DURATION_MINUTES * 60}
  )
  respuesta.token = token;
  return respuesta
}

exports.verificarToken = async(token) =>{
  const decode = await jwt.verify(token,process.env.JWT_SECRET);
  return decode
}

exports.register = async(data) =>{
  const respuesta = {};
  const validacion = validaciones.validarUsuario(data);
  if(validacion.valido){
    const userData = {
      username:data.username,
      email:data.email
    }
    userData.password = await bcrypt.hash(data.password,10)
    const usuario = await Usuario.create(userData);
    if(usuario){
      respuesta.creado = true;
      respuesta.data = usuario;
    }else{
      respuesta.creado = false;
      respuesta.error = 'Ocurrio un error al crear el usuario'
    }
  }else{
    respuesta.creado = false;
    respuesta.error = validacion.errores;
  }
  return respuesta;
}
