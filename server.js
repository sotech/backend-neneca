require('./src/utils/envConfig')
require('./src/utils/mongoDB')
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 8080;
const productoRoutes = require('./src/routes/productoRoutes')
const ordenRoutes = require('./src/routes/ordenRoutes')

app.use(express.json());
app.use(morgan('dev'));

//Rutas
app.use('/api/v1/producto',productoRoutes)
app.use('/api/v1/orden', ordenRoutes)
app.listen(port, () => {
  console.log(`Servidor corriendo en ` + port);
});