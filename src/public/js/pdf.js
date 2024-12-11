
$(document).ready(function () {
    
    var estudiante =[];
    const URI = '/api/products/pdf';
    const URI2 = '/api/products/upload';
    $.ajax({
        url: URI,
        type: 'POST',
        success: function (response) {
            var pos=0;
            var str= response+'';
            var arrayDatos=[];
            var arrayDeCadenas2=[];
            var arrayDatos2=[];
            var datos
            var up=["ADMINISTRACION PÚBLICA"," ADMINISTRACION PUBLICA","LIC.ADM. PUBLICA"]
            var arrayDeCadenas = str.split("---------------- ------------------------------ ------------------------------ ---- --------- ----------")
            var asunto=arrayDeCadenas[0].split("\n")
            console.log(asunto[6].trim())
            for (var j=0;j<arrayDeCadenas.length;j++){
                //alert(x);
                arrayDeCadenas2=arrayDeCadenas[j].split("U N I V E R S I D A D   D E   P A N A M A")
               // alert(arrayDeCadenas2.length)
                arrayDatos = arrayDeCadenas2[0].split("\n")
                for(var p=0;p<arrayDatos.length;p++){
                   datos=[]
                    arrayDatos2 = arrayDatos[p].split(" ");
                    limipar(arrayDatos2,datos)
                    //alert("datoslimpios: "+datos.length)
                   intercambiar(estudiante,datos,pos,up)
                   
                   // alert("Datos de los estudiantes:"+estudiante[p])

                    pos++;
                }
                for(i=0;i<estudiante.length;i++){
                    depurar(estudiante,i);
                }
                for(i=0;i<estudiante.length;i++){
                    eliminarCaracteresSpeciales(estudiante,i);
                }
                up=[]
                buscarDatosUp(up,arrayDeCadenas2[1])
                if(up[0]==-1&&up[1]==-1&&up[2]==-1){
                    buscarDatosUp(up,arrayDeCadenas2[0])
                }
                //console.log(arrayDatos)
            }
           //console.log(estudiante)
           estudiante= arrayToObjectPdf1(estudiante,estudiante.length,asunto[6].trim())
           //console.log(arrayDatos)
           console.log(estudiante)
           $.ajax({
                url: URI2,
                type: 'POST',
                data: {'estudiante':estudiante}, 
        }).done(function() {
            alert("datos enviados")
          });
        },
        error: function (err) {
            
            console.log(err);
        }
    })
});
function limipar(arrayDatos2, datos) {
    var j=0;
    var x=0;
    for(var i=0; i<arrayDatos2.length; i++){
        if(arrayDatos2[i]!=""){
            datos[j]=arrayDatos2[i];
            j++;
        }
        
    }
}
/* se intercambia la informacion a un array, de manera regresiva, para evitar concurrencia
con los nombres, ya que nombres vienen con Jose M lorenzo, jose manuel lorenzo p...
*/
function intercambiar (estudiante,datos,pos, datosU){
    var aux="";
    var j=0
    i=0
    var sw=0;
    var name=""
    //var estudiante=[[]];
    inializar(estudiante)
    estudiante[pos][j]="";
    // se busca la posicion del sexo
    posSex=0
    while(i<datos.length){
        if((datos[i]=="F" || datos[i]=="M")){
            posSex=i;
        }
        i++
    }
    i=0
    while(i<datos.length &&sw==0){
        if(i<4){
            estudiante[pos][j]= estudiante[pos][j]+datos[i]
        }else{
            //se une el nombre con el apellido
            if(i<posSex){
                aux=aux+" "+datos[i]
            }
            else{
                j++;
                estudiante[pos][j]=aux;
                j++
                estudiante[pos][j]=datos[i]
                sw=1;
            }
            
        }i++
        // la siguiente posicion deberia ser turno...
        

    }
    var turno=i
    for(i;i<datos.length;i++){
        //se continua agregando los datos
        // hay estudiantes sin turnos
        if(datos[turno]!="Diurno"&&datos[turno]!="Vespertin"&&datos[turno]!="Nocturno"){
            j++
            estudiante[pos][j]="sin turno"
        }
        j++
        estudiante[pos][j]=datos[i]
    }
    estudiante[pos][j+1]=datosU[0];estudiante[pos][j+2]=datosU[1];estudiante[pos][j+3]=datosU[2];
}
function inializar(estudiante){
    ///alert("entre")
    estudiante.push([]);
}
function buscarDatosUp(datos,texto){
    texto=texto+""
    var sw=0
    var aux= texto.split("\n")
    var aux2
    for (let index = 0; index < aux.length; index++) {
        aux2=""
        if(aux[index].search("Facultad")>-1){
            aux2=aux[index].split(": ")
            datos[0]=aux2[1]
            sw=1
        }
        else
            if(aux[index].search("Escuela")>-1){
                aux2=aux[index].split(": ")
                datos[1]=aux2[1]
                sw=1
            }
            else
                if(aux[index].search("Carrera")>-1){
                    aux2=aux[index].split(": ")
                    datos[2]=aux2[1]
                    sw=1
                }
        
    }
    if(sw==0){
        datos[0]=-1;datos[1]=-1;datos[2]=-1
    }
    //Carrera
}
function depurar (datos,j){
    var ind=-1;
    var i=0
    var aux=""+datos[j][0];
    var aux2=[]
    concurrencias=["\f","\r","Sede","Facultad","Escuela","Carrera","Totaldeestudiantes","CEDU"]
    while(i<concurrencias.length && ind==-1){
        ind= aux.search(concurrencias[i])
        if(ind>-1){
            datos[j]=[];
        }
        i++;
    }
}
function eliminarCaracteresSpeciales( cadena,j){
    var n= cadena[j].length
    for(var i=0;i<n;i++){
        aux=""+ cadena[j][i]
        aux2=""
        for(var x=0;x<aux.length;x++){
            if(aux[x]!="\f" || aux[x]!="\r"){
                aux2+= aux[x]
            }
        }
        cadena[j][i]= aux2
    }
}
function UnirMateria(array,n){
    
}
function arrayToObjectPdf1(array1,n,asunto){
    var estXsex=[];
    var obj
    var ind = 0
    var carrera;
    var facultad;
    for(var i=0;i<n;i++){
        if(array1[i][0]!='' && array1[i].length>0){
            obj={}
            obj.cedula= array1[i][0].trim()
            obj.nombre= array1[i][1].trim()
            obj.sex= array1[i][2].trim()
            obj.turno= array1[i][3].trim()
            //console.log("dato a analizar:"+array1[i][4])
            obj.ano= array1[i][4]+''.trim()
            facultad=array1[i][5].trim()
            obj.facultad= facultad.substring(0, 2)+"-"+facultad.substring(3).trim()
            obj.escuela= array1[i][6]+''.trim()
            carrera=array1[i][7]+''.trim()
            obj.carrera= carrera.substring(0, 2)+"-"+carrera.substring(3).trim()
            obj.asunto=asunto
            estXsex[ind]= obj
            ind++
        }

    }
    return (estXsex)
}
//PlanE