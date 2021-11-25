require('./src/utils/envConfig')
require('./src/utils/mongoDB')
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 8080;
//Rutas

app.use(express.json());
app.use(morgan('dev'));

app.listen(port, () => {
  console.log(`Servidor corriendo en ` + port);
});