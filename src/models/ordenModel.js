const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto'
  },
  cantidad: {
    type: Number,
    default: 1
  }
});

const ordenSchema = mongoose.Schema({
  timestamp: String,
  estado:String,
  nombre_comprador:String,
  direccion_envio:String,
  email_comprador:String,
  pedidos:[itemSchema]
});


const Orden = mongoose.model("Orden", ordenSchema);
module.exports = Orden;