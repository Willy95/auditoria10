'use strict'

function getValues(){
  var formdata = new FormData($("#image")[0]);
  formdata.append("nombre", $("#business").val());
  formdata.append("folio", $("#folio").val());

  return formdata;
}

$("#save").click(function(e){
  let values = getValues();
  console.log(values);
  $.ajax({
    'url': '/savebusiness',
    'method': 'POST',
    'data': values
  })
  .done(function(res){
    if (res.status == 200){
      window.location.reload();
    }
    if (res.status == 401) {
      alert('Error')
      console.log(res)
    }
    console.log("Exito", res);
  })
  .fail(function(err){
    console.log("Error", err);
  });
});
