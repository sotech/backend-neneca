const mongoose = require("mongoose");
const productoSchema = mongoose.Schema({
  timestamp: String,
  nombre: String,
  precio: Number,
  descripcion: String,
  thumbnail: String,
  stock: Number,
  tags: Array
});
const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;