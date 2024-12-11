const path = require('path');
const express= require('express');
const router = express.Router();
const mongoose = require("mongoose");
var datoE= mongoose.Schema({
  cedula: String,
  nombre: String,
  sexo: String,
  facultad:String,
  escuela:String,
  carrera:String,
  turno: String,
   ano: String
})
var estudianteModelo=mongoose.model("estudiante", datoE);
module.exports = estudianteModelo