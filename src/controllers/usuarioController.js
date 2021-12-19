const usuarioAPI = require('../api/usuarioAPI');


exports.loginUsuario = async (req,res) => {
  try{
    const user = req.body;
    const respuesta = await usuarioAPI.login(user);
    if(respuesta.logeado){
      res.status(200).json({ msg: 'Usuario logeado', token: "Bearer " + respuesta.token })
    }else{
      res.status(400).json({ msg: respuesta.error })
    }
  }catch(err){
    res.status(500).json({ error: err })
  }
}

//Funcion para verificar la validez del token.
exports.verificarToken = async (req,res,next) => {
  try{
    const token = req.headers["x-access-token"]?.split(' ')[1]
    if(token){
      const decode = await usuarioAPI.verificarToken(token);
      console.log(decode)
      if (decode){
        next()
      }else{
        res.status(400).json({msg:'Error. Token invalido', loggedIn:false})
      }
    }else{
      res.status(400).json({msg:'No se envio un token para validar'})
    }
  }catch(err){
    res.status(500).json({error:err, loggedIn:false})
  }
}
exports.crearUsuario = async (req,res) =>{
  try{
    const user = req.body;
    const respuesta = await usuarioAPI.register(user);
    if(respuesta.creado){
      res.status(201).json({ msg: 'Usuario creado', data: respuesta.data })
    } else {
      res.status(400).json({ msg: respuesta.error })
    }
  }catch(err){
    res.status(500).json({ error: err })
  }
}