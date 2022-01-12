const mongoose = require("mongoose");
const variacionSchema = mongoose.Schema({
  timestamp: String,
  nombre: String,
  precio: Number,
  thumbnail: String,
  producto: {type: mongoose.Schema.Types.ObjectId, ref: 'Producto'},
  image: {
    data: Buffer,
    contentType: String,
  },
  stock: Number
});

const Variacion = mongoose.model("Variacion", variacionSchema);
module.exports = Variacion;