exports.get404 = (req,res,next) => {
  res.status(404).send("<h1>Pagina no encontrada</h1>")
}

exports.mainPage = (req,res) => {
  res.status(200).send("<h1>Backend NenecaHome</h1> <p>Servidor iniciado</p>")
}