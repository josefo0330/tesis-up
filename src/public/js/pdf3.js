$(document).ready(function () {
    
    const URI = '/api/products/pdf3';
    $.ajax({
        url: URI,
        type: 'POST',
        success: function (response) {
            var aux= ""+response;
            //console.log(aux);
            //$("#prueba").html(aux)
            

           
        },
        error: function (err) {
            
            console.log(err);
        }
    })
});