const mongoose = require("mongoose");
const productoSchema = mongoose.Schema({
  timestamp: String,
  nombre: String,
  descripcion: String,
  thumbnail: String,
  stock: Number
});
const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;