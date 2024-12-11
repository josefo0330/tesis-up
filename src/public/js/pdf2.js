//const { token } = require("morgan");

$(document).ready(function () {
    const URI = '/api/products/pdf2';
    const URI2 = '/api/products/pfd2Upload';
    $.ajax({        
        url: URI,
        type: 'POST',
        success: function (response) {
            //alert("entre")
            var i=0
            var aux= ""+response;
            datos=[]
            var j=0
            var x=0
            cadena3=[]
            inf=[]
         // console.log(aux);
          cadena1= aux.split("UNIVERSIDAD DE PANAMA")
          //console.log("Entre")
          //console.log (cadena1[1])
          //console.log (cadena1[2])
           for(var i=0;i<cadena1.length;i++){
            //console.log(cadena1[i])
            cadena2 = cadena1[i].split("Nombre")
            cadena3= cadena2[0].split("\n")
           //console.log(cadena3)
            inf[x]=[cadena3[8],cadena3[9],cadena3[10],cadena3[11],cadena3[12],cadena3[13]]
            x++
            // console.log(cadena2[1]);
            cadena2[1]=cadena2[1]+""
                datos[j]=cadena2[1].split("\n")
                //depurarDatosPdf2(datos[j],datos[j].length)
            // depurar(datos[j])
                j++;
            }
            var tam=0
            //console.log(inf)
        for (i=0;i<j;i++){
            var n=datos[i].length
           datos[i]=depurarDatosPdf2(datos[i],n)
        }
       inf= arrayToObject(inf,datos,j);
       console.log(inf)
        for ( i=1;i<j;i++){
            tam=datos[i][0].length
            datos[i]=depurarpdf2(datos[i],tam)
        }
        $.ajax({
            url: URI2,
            type: 'POST',
            data: {'inf': inf}, 
    }).done(function() {
        alert("datos enviados pdf2")
      });
    },
    error: function (err) {      
        console.log(err);
       }
        
    })
    
});
function depurarpdf2 (array,n){
    var aux2 = []
    aux3=array
    var p;
    //aux = array;
    var i=0;
    //var x = aux[2].length
    //console.log("la longitud es "+x)
    //console.log("la datos es "+array[2])
        if(n>4){
            //console.log("la longitud es "+n)
            //console.log("la datos son"+array[2][i])
            var nombre="";
            var posCant=0
            prov=""
            tomo=""
            asient=""
            num=""
            pos=""
            aux2=array[0]

            //console.log("la datos son"+aux2[i])
            p=0
            for (i=n-1;i>-1;i--){
                //console.log("entre")
                if(aux2[i]=='0' || ( aux2[i]=='1' || aux2[i]=='2' || aux2[i]=='3' ||aux2[i]=='4' ||aux2[i]=='5' ||aux2[i]=='6' ||aux2[i]=='7' || aux2[i]=='8' ||aux2[i]=='9' )){
                    //console.log("entre")
                    p=i
                    i=-1
    
                }
            }
            for (i=p+1;i<n;i++){
                nombre= nombre+ aux2[i]
            }  
            
            for (i=p;i>p-4;i--){
                asient= asient+ aux2[i]
            }
           asient= girarCad(asient,4)
            p=p-5; 
            for (i=p;i>p-3;i--){
                tomo= tomo+ aux2[i]
            }
            tomo= girarCad(tomo,3)
            p=p-4

            for (i=p;i>p-2;i--){
                num= num+ aux2[i]
            }
            p=p-2
           
            for (i=p;i>p-2;i--){
                prov= prov+ aux2[i]
            }
            prov= girarCad(prov,2)
            p=p-2
            for(i=p;i>-1;i--){
                pos=pos + aux2[i]
                posCant++;
                
            }
            pos= girarCad(pos,posCant)
            aux3=[pos,prov,num,tomo,asient,nombre,array[1]]
            //console.log("La posicion es: "+aux3[0]+" la prov es: "+aux3[1] +", numero: "+aux3[2]+ " tomo: "+aux3[3] +" asiento: "+aux3[4]+", nombre: "+aux3[5]+ " recibido: "+aux3[6]  )
            //console.log("La posicion es: "+pos+" la prov es: "+prov +", numero: "+num+ " tomo: "+tomo +" asiento: "+asient+", nombre: "+nombre  )
        }
        return aux3
    
}
function girarCad (cadena, long){// gira cadenas 
    var aux="" 
    for(i=long-1;i>=0;i--){
        aux=aux+cadena[i];
    }
    
    return(aux)
}function depurarDatosPdf2 (array,n){
    var j=0;
    var aux=[]
    for(var i=2;i<n-6;i++){
        aux[j]=array[i];
        j++;
    }
    //console.log(aux)
    //console.log(j);
    return (aux)
}

function arrayToObject(array1,array2,n){
    var i;
    var j;
    var listPre=[];
    var obj={}
    var aux=[]
    var aux2
    var aux3
    var cedula=""
    var nombre=""
    var x=0; 
    var ind = 0
    var facultad;
    var carrera;
    //alert("Hola");
    for (i=1;i<n;i++){
        obj={}
        aux2 = []
        aux3=[]
        aux= array1[i][0].split(':')
        facultad=aux[1];
        obj.Facultad = facultad.substring(0,2)+"-"+facultad.substring(2).trim()//aux[1];
        aux= array1[i][1].split(':')
        obj.Escuela = aux[1];
        aux= array1[i][2].split(':')
        carrera=aux[1]
        obj.Carrera = carrera.substring(0, 2)+"-"+carrera.substring(2).trim()//aux[1];
        aux= array1[i][3].split(':')
        obj.Curso = aux[1];
        aux= array1[i][4].split(':')
        obj.Asignatura = aux[1];
        aux= array1[i][5].split(':')
        obj.Profesor = aux[1];
        x=array2[i].length/8
        
       obj.cedulas=[]
       obj.nombres=[]
       if(array2[i].length<8){
        //console.log("error tamano: "+array2[i].length)
        //console.log(array2[i])
        cadena=array2[i][0]
        cadena2= cadena.split('')
        //console.log(cadena)
        x=0
        while(Number(cadena2[x])|| cadena2[x]=="0"){
            x++
        }   
        //console.log(x)
        aux2 = cadena.substring(x-13,x-11)+" "+cadena.substring(x-11,x-9)+" "+cadena.substring(x-9,x-5)+" "+cadena.substring(x-5,x)
        aux3 = cadena.substring(x);
        //console.log(aux2)
        //console.log(aux3)
       }
       else{
        for(j=0;j<x;j++){
            aux2[j] = array2[i][j+(x*1)]+ " "+array2[i][j+(x*2)]+ " "+array2[i][j+(x*3)]+ " "+array2[i][j+(x*4)]
            aux3[j] = array2[i][j+(x*5)]+ " "+array2[i][j+(x*6)]
        }
        }   
        obj.cedulas = aux2
        obj.nombres = aux3
        //alert(x);
        listPre[ind]=obj
        ind++

    }
   return (listPre)
}
//PlanE