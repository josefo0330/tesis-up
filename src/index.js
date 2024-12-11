const express= require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const morgan = require('morgan');
var bodyParser = require('body-parser')
var PdfReader = require('pdfreader').PdfReader;
const fs= require('fs') 
const { dirname } = require('path');
const conexion = require('./router/baseDataConect/conexion');
//configuraciones
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}))
app.use(morgan('dev'));
//app.set('port',4000);
app.set('port', process.env.PORT || 4000);

app.set('views',path.join(__dirname,'view'));
app.set('view engine','ejs');
//rutas 
//base datos
app.get("/", (req, res) => {
    res.render("index.ejs");
  });
app.get("/analisis", (req, res) => {
    res.render("analisis.ejs");
  });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//app.use( require(path.join(__dirname,'router/router.js')))
app.use( '/api/products', require(path.join(__dirname,'router/ajax.js')))
//arrancando el servidor con node js
//archivos estaticos
app.use(express.static(path.join(__dirname,'public')))
app.listen(app.get('port'),()=>{
    console.log("server work, port:",app.get('port'));
});
 //lectura de pdf


