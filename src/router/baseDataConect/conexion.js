const mongoose = require('mongoose');
const express= require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/cruv')
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))
// parse application/x-www-form-urlencoded

module.exports = router;