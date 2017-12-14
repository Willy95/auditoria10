'use strict'

$('#singleEnviar').click(function(e){
    e.preventDefault();
    var quest = $("label[id*='question']").length;
    var yes = $('.yes:checked').length;
    var promedio = (yes * 100) / quest
    alert('Este es tu promedio ' + promedio + '%')
})
