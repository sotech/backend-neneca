const mongoose = require("mongoose");
const usuarioSchema = mongoose.Schema({
  username:String,
  password:String,
  email:String
});
const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;