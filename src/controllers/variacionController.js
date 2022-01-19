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
  const payload = req.body;
  let fileUploaded = false;
  if (req.file) {
    //Leer archivo segun su path
    pathToFile = path.join(process.cwd() + "/uploads/" + req.file.filename);
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
  try {
    const respuesta = await variacionAPI.agregarVariacion(id, payload);
    if (respuesta.agregado) {
      if (fileUploaded) {
        try {
          fs.unlinkSync(pathToFile);
        } catch {}
      }
      res
        .status(200)
        .json({ msg: "Variacion agregada", data: respuesta.variacion });
    } else {
      res.status(400).json({ error: respuesta.error });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
exports.actualizarVariacion = async (req, res) => {
  const id = req.params.idVariacion;
  const payload = req.body;
  let fileUploaded = false;
  if (req.file) {
    //Leer archivo segun su path
    pathToFile = path.join(process.cwd() + "/uploads/" + req.file.filename);
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
  try {
    const respuesta = await variacionAPI.actualizarVariacion(id, payload);
    if (respuesta.actualizado) {
      if (fileUploaded) {
        try {
          fs.unlinkSync(pathToFile);
        } catch {}
      }
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
