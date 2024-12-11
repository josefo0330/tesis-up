const path = require('path');
const express= require('express');
const router = express.Router();
const mongoose = require("mongoose");
var datos= mongoose.Schema({
  facultad: String,
  carrera: String,
  escuela: String,
  curso: Number,
  asignatura: String,
  profesor: String,
  cedulas: Array,
  nombres: Array
})
var materias= mongoose.model("datos", datos);
module.exports = materias