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
  nombreComprador:String,
  direccionEnvio:String,
  emailComprador:String,
  pedidos:[itemSchema]
});


const Orden = mongoose.model("Orden", ordenSchema);
module.exports = Orden;