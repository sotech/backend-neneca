const variacionAPI = require("../api/variacionAPI");
const fs = require("fs");
const path = require("path");

exports.obtenerVariacionesDelProducto = async (req, res) => {
  const id = req.params.idProducto;
  try {
    const respuesta = await variacionAPI.obtenerVariaciones(id);
    if (respuesta.variaciones) {
      if (respuesta.variaciones.length > 0) {
        res.status(200).json({ data: respuesta.variaciones });
      } else {
        res.status(404).json({ error: "No hay variaciones en ese producto" });
      }
    } else {
      res.status(400).json({ error: respuesta.error });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.obtenerVariacion = async (req, res) => {
  const id = req.params.idVariacion;
  try {
    const respuesta = await variacionAPI.obtenerVariacion(id);
    if (respuesta.variacion) {
      res.status(200).json({ data: respuesta.variacion });
    } else {
      res.status(404).json({ error: "Variacion no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.agregarVariacionAlProducto = async (req, res) => {
  const id = req.params.idProducto;
  let payload = req.body;
  if(req.files[0]){
    const b64img = req.files[0].buffer.toString("base64");
    payload.image = {
      data: b64img,
      contentType: req.files[0].mimetype
    }
  }
  try {
    const respuesta = await variacionAPI.agregarVariacion(id, payload);
    if (respuesta.agregado) {
      /*
      if (fileUploaded) {
        try {
          fs.unlinkSync(pathToFile);
        } catch {}
      }
      */
      res
        .status(200)
        .json({ msg: "Variacion agregada", data: respuesta.variacion });
    } else {
      res.status(400).json({ error: respuesta.error });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
  /*
  let fileUploaded = false;
  if (req.files[0]) {
    //Leer archivo segun su path
    var pathToFile = path.join(process.cwd() + "/uploads/" + req.files[0].filename);
    
    const img = fs.readFileSync(pathToFile);
    //Codificar
    const encode_img = img.toString('base64');
    //Crear objeto
    payload.image = {
        contentType:req.file.mimetype,
        data:encode_img
    };
    fileUploaded = true;
  }
  */
};
exports.actualizarVariacion = async (req, res) => {
  const id = req.params.idVariacion;
  const payload = req.body;
  if(req.files[0]){    
      const b64img = req.files[0].buffer.toString("base64");
      const image = {
        data: b64img,
        contentType: req.files[0].mimetype
      };
      payload.image = image
    
  }
  /*
  let fileUploaded = false;
  if (req.files[0]) {
    //Leer archivo segun su path
    var pathToFile = path.join(process.cwd() + "/uploads/" + req.file[0].filename);
    const img = fs.readFileSync(pathToFile);
    //Codificar
    const encode_img = img.toString('base64');
    //Crear objeto
    payload.image = {
        contentType:req.file.mimetype,
        data:encode_img
    };
    fileUploaded = true;
  }
  */
  try {
    const respuesta = await variacionAPI.actualizarVariacion(id, payload);
    if (respuesta.actualizado) {
      /*
      if (fileUploaded) {
        try {
          fs.unlinkSync(pathToFile);
        } catch {}
      }
      */
      res.status(200).json({ msg: "Variacion actualizada" });
    } else {
      res.status(404).json({ error: respuesta.error });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
exports.eliminarVariacion = async (req, res) => {
  const id = req.params.idVariacion;
  try {
    const respuesta = await variacionAPI.eliminarVariacion(id);
    if (respuesta.eliminado) {
      res.status(200).json({ msg: "Variacion eliminada" });
    } else {
      res.status(404).json({ error: respuesta.error });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

