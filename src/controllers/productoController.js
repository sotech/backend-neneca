//Usar el API para resolver los distintos endpoints

const productoAPI = require('../api/productoAPI')

exports.agregarProducto = async (req, res) => {
  try {
    const payload = req.body;
    const respuesta = await productoAPI.agregarProducto(payload);
    if(respuesta.creado){
      res.status(201).json({ data: respuesta.producto })
    }else{
      res.status(400).json({ error: respuesta.errores })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}