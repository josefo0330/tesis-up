
const mongoose = require('mongoose');
const path = require('path');
const express= require('express');
const router = express.Router();
const conexion = require(path.join(__dirname,'baseDataConect/conexion.js'))
var datos= mongoose.Schema({
    name: String,
      price: Number,
      quantity: Number
})
    var dato = mongoose.model('datos', datos);
// a document instance
var book1 = new dato({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });
 
// save model to database
// save model to database
book1.save(function (err, dato) {
  if (err) return console.error(err);
  console.log(dato.name + " saved to bookstore collection.");
});
module.exports = router;
