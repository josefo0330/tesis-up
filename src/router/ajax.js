/*const express= require('express');
const router = express.Router();
const path = require('path');
var facult=[];
const carreras=[];
var aux1;
const fs= require('fs') 
const pdfparse = require('pdf-parse')
var numCarpeta='' //numero de la carpeta a buscar
conexion = require(path.join(__dirname,'baseDataConect/conexion.js'))
// se carga las carreras en el select de manera dinamica
router.post('/',(req,res)=>{
    var j;
    //const { name } = req.body;
    const { name } = req.body;
    conexion.query('SELECT * FROM carrera WHERE id_facultad='+name,function(error,results,fields){
        if (error){
            throw error;
        }
        var i=0
        results.forEach(results => {
           carreras.push({ 
               id: results['id_carrera'],
               name :results['nombre_carrera']
           } )
           aux=carreras[0].name
        });
        
        res.json(carreras)
        carreras.splice(0)
        //document.getElementById('facultades').innerHTML(facultades);
    });

    console.log(aux1)
})
router.post('/archivo',(req,res)=>{
    var { id } = req.body;
    numCarpeta= id+''
    console.log('numero de la carpeta:'+numCarpeta)
})

router.post('/tabla',(req,res)=>{
    var ruta='hola';
    /*fs.readdir(path.join(__dirname,'recursos',numCarpeta), function (err, archivos) {
        if (err) {
        onError(err);
        return;
        }
       console.log('archivo: '+archivos[0])
        
        })
        /////////////////////////////////////////// folder
        var aux;
        ruta=fs.readdirSync(path.join(__dirname,'recursos',numCarpeta)); 
    //const pdffile 
    aux = fs.readFileSync(path.join(__dirname,'recursos',numCarpeta,ruta[0]),'UTF-8')
    //pdfparse(pdffile).then(function(data){
           // aux.text= data.text.toString()
            //console.log(data)
            res.json(aux)
//})
});
module.exports = router;*/
const express= require('express');
const router = express.Router();
const path = require('path');
const fs= require('fs') ;
fs.readdir(path.join(__dirname,'recursos',"1"), function (err, archivos,) {
    if (err) {
    onError(err);
    return;
    }
   console.log('archivo: '+archivos[0])
    
    })
    /////////////////////////////////////////// folder

    var aux;
    var aux2
    ruta=fs.readdirSync(path.join(__dirname,'recursos',"1")); 
//const pdffile 
aux = fs.readFileSync(path.join(__dirname,'recursos',"1",ruta[0]),'UTF-8')
//pdfparse(pdffile).then(function(data){
       // aux.text= data.text.toString()
        //console.log(data)
      // console.log(aux)
    router.post("/pdf", function(req, res){
        res.json(aux);
    })
    router.post('/upload', function(req, res){
        //console.log(req.body);
        res.send("hola")
        });




    //-------------------------//
    const pdf = require('pdf-parse');
    var datos="";
const PdfParse = require('pdf-parse');
    ruta2=fs.readdirSync(path.join(__dirname,'recursos',"4")); 
    //const pdffile 
    aux2= fs.readFileSync(path.join(__dirname,'recursos',"4",ruta2[0]))
   PdfParse(aux2).then(function( data){
        //nconsole.log(data.text)
        datos= data.text
        //console.log(datos)
    })
    router.post("/pdf2", function(req, res){
        
        res.send(datos);
    })

    /*..................................................*/

    var aux3;
    ruta3=fs.readdirSync(path.join(__dirname,'recursos',"3")); 
    //const pdffile 
    aux3 = fs.readFileSync(path.join(__dirname,'recursos',"3",ruta3[0]),'UTF-8')
    router.post("/pdf3", function(req, res){
        res.json(aux3);
    })
 module.exports=router