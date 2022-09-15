
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
                up=[]
                buscarDatosUp(up,arrayDeCadenas2[1])
                if(up[0]==-1&&up[1]==-1&&up[2]==-1){
                    buscarDatosUp(up,arrayDeCadenas2[0])
                }
            }
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
function intercambiar (estudiante,datos,pos, datosU){
    var aux="";
    var j=0
    var i=0
    var sw=0;
    //var estudiante=[[]];
    inializar(estudiante)
    estudiante[pos][j]="";
    while( i<datos.length && sw==0){
        if(i<4){
            estudiante[pos][j]= estudiante[pos][j]+datos[i]
        }else{
            if(datos[i]!="F" &&datos[i]!="M"){
                aux=aux+" "+datos[i]
            }
            else{
                
                j++;
                estudiante[pos][j]=aux;
                j++
                estudiante[pos][j]=datos[i]
                sw=1;
            }
            
        }
        i++
    }
    for(i;i<datos.length;i++){
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
    concurrencias=["\r","Sede","Facultad","Escuela","Carrera","Totaldeestudiantes","CEDU"]
    while(i<concurrencias.length && ind==-1){
        ind= aux.search(concurrencias[i])
        if(ind>-1){
            datos[j]=[];
        }
        i++;
    }
}
//PlanE