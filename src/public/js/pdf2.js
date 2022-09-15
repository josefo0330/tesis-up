$(document).ready(function () {
    
    const URI = '/api/products/pdf2';
    $.ajax({
        url: URI,
        type: 'POST',
        success: function (response) {
            var aux= ""+response;
           console.log(aux);
          cadena1= aux.split("No.")
          //console.log("Entre")
           for(var i=0;i<cadena1.length;i++){
            //console.log(cadena1[i])
               //cadena2 = cadena1[i].split("recibo")
               //console.log(cadena2[0])
               if(i%2==0){
                //console.log(cadena1[i])
               }
                
                
                
            }
            

           
        },
        error: function (err) {
            
            console.log(err);
        }
    })
});

//PlanE