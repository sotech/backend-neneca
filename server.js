require('./src/utils/envConfig')
require('./src/utils/mongoDB')
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 8080;
const productoRoutes = require('./src/routes/productoRoutes')
const ordenRoutes = require('./src/routes/ordenRoutes')
const usuarioRoutes = require('./src/routes/usuarioRoutes')
const variacionRoutes = require('./src/routes/variacionRoutes')
const mainRoutes = require('./src/routes/mainRoutes');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().any());
app.use(cors())
app.use(morgan('dev'));

//Rutas
app.use('/api/v1/producto', productoRoutes)
app.use('/api/v1/orden', ordenRoutes)
app.use('/api/v1/usuario', usuarioRoutes)
app.use('/api/v1/variacion', variacionRoutes);
app.get('/', mainRoutes.mainPage)
app.use(mainRoutes.get404)

app.listen(port, () => {
  console.log(`Servidor corriendo en ` + port);
});