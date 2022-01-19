const mongoose = require("mongoose");
const variacionSchema = mongoose.Schema({
  timestamp: String,
  nombre: String,
  precio: Number,
  thumbnail: String,
  image: {
    data: String,
    contentType: String,
  },
  stock: Number
});

const Variacion = mongoose.model("Variacion", variacionSchema);
module.exports = Variacion;