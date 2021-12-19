const Usuario = require('../models/usuarioModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  //Todo: Aplicar bcrypt para comparar
  if(userDB.password != user.password){
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

exports.register = async(user) =>{
  const respuesta = {};
  //Todo: Aplicar bcrypt para guardar la contraseña
  const usuario = await Usuario.create(user);
  if(usuario){
    respuesta.creado = true;
    respuesta.data = usuario;
  }else{
    respuesta.creado = false;
    respuesta.error = 'Ocurrio un error al crear el usuario'
  }
  return respuesta;
}
