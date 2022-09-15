$(document).ready(function()
{
    const URI = '/api/products';
    $("#facultades").on('change',function(e){
        e.preventDefault();
        var id = $('#facultades').val()
        $.ajax({
            type: 'POST',
            url: URI,
            data: {
                 'name': $('#facultades').val()
                },
        success: function(response) {
        var selectt = $('#carreras');
        var aux='';
        console.log(response[0].name.substring(3))
        for(var i=0; i<response.length; i++){
                aux=aux+'<option value="'+response[i].id+'">' +response[i].name+ '</option>'; 
            }
        selectt.html(aux)
        },
        error: function (err) {
          console.log(err);
        }
        })
        /*.done(function(listas_rep){
            console.log(listas)
        })
        .fail(function(err){
            alert(err.data)
        })*/
    })
    $("#buscar").on('click',function(e){
        $.ajax({
            type: 'POST',
            url: URI+'/archivo',
            data: {
                'id': $('#carreras').val()
            },
            success: function (response) {
                console.log('se envio correctamente el id de la carrera')
            }
        })  
    }) 
});