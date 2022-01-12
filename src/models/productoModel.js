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

productoSchema.pre('deleteOne', (next) => {
  const productoId = this.getQuery()["_id"];
  mongoose.model("Variacion").deleteMany({'producto':productoId},(err,result) => {
    if(err){
      console.log(err);
      next(err)
    }
    next()
  })
})
const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;