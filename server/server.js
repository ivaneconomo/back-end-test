require('dotenv/config');
const express = require('express');
const app = express();
require('../dataBase/db-connection');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('../routes/user-route');
const loginRoute = require('../routes/login-route');
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/users', userRoutes);
app.use('/login', loginRoute);

app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`);
});
