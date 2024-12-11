const mongoose = require('mongoose');
const express= require('express');
//const estudianteModelo = require('./modeloEstudiante');
var MongoClient = require('mongodb').MongoClient;
const router = express.Router();
mongoose.set("strictQuery", true);
var url = "mongodb://0.0.0.0:27017/";
var db=mongoose.connect('mongodb+srv://joseD:joseD1234@cluster0.hrac3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
  //seFindAndModify: false 
//useCreateIndex: true,
})
  .then(()=> {
    console.log('conectado a mongodb')
    /*
    
     var datos= mongoose.Schema({
    name: String,
      price: Number,
      quantity: Number
})
    var dato = mongoose.model('datos', datos);
// a document instance
var book1 = new dato({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });
 
// save model to database
book1.save(async function (err, dato) {
    if (err) return console.error(err);
  console.log(dato.name + " saved to bookstore collection.");
});*/
  }) 
  .catch(e => console.log('error de conexión', e))
  /*
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cruv");
    var myquery = { };
    dbo.collection("datos").deleteMany(myquery, function(err, obj) {
      if (err) throw err;
      console.log( " document(s) deleted");
    });
    dbo.collection("estudiantes").deleteMany(myquery, function(err, obj) {
      if (err) throw err;
      console.log( " document(s) deleted");
    });
  }); */
// parse application/x-www-form-urlencoded

module.exports = router;
//mongodb://0.0.0.0:27017/