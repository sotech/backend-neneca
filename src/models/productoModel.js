const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
  timestamp: String,
  nombre: String,
  descripcion: String,
  categoria: String,
  tags: Array,
  variaciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variacion'
  }]
});

const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;