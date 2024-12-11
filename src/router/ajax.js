const express= require('express');
const router = express.Router();
const path = require('path');
const fs= require('fs') ;
const multer= require('multer')
const mimeType= require('mime-types')
var aux;
var aux2
const storage = multer.diskStorage({
    destination: path.join(__dirname,'recursos',"listaD"),
    filename: function(req,file,cb){
        cb("","Directorio de Estudiantes Sexo y Turno CRUV."+mimeType.extension(file.mimetype))
    }
})
const upload1= multer({
    storage: storage
})
const storage2 = multer.diskStorage({
    destination: path.join(__dirname,'recursos',"listaP"),
    filename: function(req,file,cb){
        cb("","Lista Preliminar de Estudiantes CRUV."+mimeType.extension(file.mimetype))
    }
})
const upload2= multer({
    storage: storage2
})
router.post('/file2',upload2.single('myFile2'),function(req, res){
    
        //pfd2Upload-------------------------//
        const pdf = require('pdf-parse');
        var datos="";
        const PdfParse = require('pdf-parse');
        const { data } = require('jquery');
        ruta2=fs.readdirSync(path.join(__dirname,'recursos',"listaP")); 
            //const pdffile 
        aux2= fs.readFileSync(path.join(__dirname,'recursos',"listaP",ruta2[0]))
       PdfParse(aux2).then(function( data){
                //nconsole.log(data.text)
            datos= data.text
                //console.log(datos)
            })
        router.post("/pdf2", function async(req, res){
                
            res.send(datos);
        })
        res.send("Hola")

})

router.post('/file1',upload1.single('myFile1'),function(req, res){
         //console.log(req)
     //console.log(req.file)
     ruta=fs.readdirSync(path.join(__dirname,'recursos',"listaD")); 
     //const pdffile 
     aux = fs.readFileSync(path.join(__dirname,'recursos',"listaD",ruta[0]),'UTF-8')
     //pdfparse(pdffile).then(function(data){
            // aux.text= data.text.toString()
             //console.log(data)
           // console.log(aux)
    router.post("/pdf", function(req, res){
        res.send(aux)
    })
    res.send("HOLA")

        /*..................................................*/

})
fs.readdir(path.join(__dirname,'recursos',"1"), function (err, archivos,) {
    if (err) {
    onError(err);
    return;
    }
   console.log('archivo: '+archivos[0])
    
    })
    /////////////////////////////////////////// folder


    router.post('/upload', function(req, res){
        const mongoose = require("mongoose");
    var datos= mongoose.Schema({
        cedula: String,
        nombre: String,
        sexo: String,
        facultad:String,
        escuela:String,
        carrera:String,
        turno: String,
        ano: String,
        asunto: String
    })
            var datas= []
        datas= req.body
       datas = Object.values(datas)
       datas= datas[0]
       console.log( datas[0]);
       var dato = mongoose.model("estudiantes", datos);
       dato.deleteMany(
        {}).then(
           async function () {
                // Success
                console.log("Data deleted");
                for (var i=0;i<datas.length;i++){
                    est= datas[i];
                    const newEst = new dato({
                        cedula: est.cedula,
                        nombre: est.nombre,
                        sexo: est.sex,
                        facultad:est.facultad,
                        escuela:est.escuela,
                        carrera:est.carrera,
                        turno: est.turno,
                        ano: est.ano,
                        asunto:est.asunto
                      });
                      const estudiante =  newEst.save();
                    }
            }).catch(
                function (error) {
                    // Failure
                    console.log(error);
                });

         
        //console.log(req.body);
        res.send("hola") 
        
    });
    router.post('/pfd2Upload', function (req, res) {
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
        var dato1 = mongoose.model("datos", datos);
        dato1.deleteMany(
            {}).then(
               async function () {
                    // Success
                    console.log("Data deleted");
                    for (var i=0;i<datas.length;i++){
                        est= datas[i];
                        const newMat = new dato1({
                            facultad: est.Facultad,
                            carrera: est.Carrera,
                            escuela: est.Escuela,
                            curso: est.Curso,
                              asignatura: est.Asignatura,
                              profesor: est.Profesor,
                              cedulas: est.cedulas,
                              nombres: est.nombres
                          });
                          const materia =  newMat.save();
            
                    }
                }).catch(
                    function (error) {
                        // Failure
                        console.log(error);
                    });
        var datas= []
        datas= req.body
       datas = Object.values(datas)
       datas= datas[0]
       
       // console.log( datas[0]);
        //console.log(req.body);
        

     
        res.send("hola") 
        
    });


    var aux3;
    ruta3=fs.readdirSync(path.join(__dirname,'recursos',"3")); 
    //const pdffile 
    aux3 = fs.readFileSync(path.join(__dirname,'recursos',"3",ruta3[0]),'UTF-8')
    router.post("/pdf3", function(req, res){
        res.json(aux3);
    })
 module.exports=router