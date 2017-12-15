'use strict'

$('#singleEnviar').click(function(e){
    e.preventDefault();
    var $btn = $(this);
    $btn.text("Generando archivo PDF");
    $btn.prop('disabled', true);
    var relation = $(this).data('rel');
    var quest = $("label[id*='question']").length;
    var yes = $('.yes:checked').length;
    var promedio = (yes * 100) / quest
    $("#result span").text(promedio + '%');
    $("#result").show('slow', function () {
      var htmlCode = `${$("#pdf").html()}`;
      $.ajax({
        url: '/makePfd',
        type: 'POST',
        data: {html: htmlCode, id: relation}
      })
      .done(function(res) {
        console.log(res);
        window.open(
          '/reportes/' + res.data.name,
          '_blank' // <- This is what makes it open in a new window.
        );
        $btn.remove();
      })
      .fail(function(err) {
        console.log(err);
      });
    });
    // alert('Este es tu promedio ' + promedio + '%')
})
