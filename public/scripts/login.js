'use strict'

function getValues(){
  const value = {
    'username': $("#username").val(),
    'password': $("#password").val()
  }
  return value;
}


$("#login-btn").click(function(e){
  let values = getValues();
  console.log(values);
  $.ajax({
    'url': '/login',
    'method': 'POST',
    'data': values
  })
  .done(function(res){
    if (res.status == 200){

    }
    console.log("Exito", res);
  })
  .fail(function(err){
    console.log("Error", err);
  })
  .always(function(e){
    alert('Petición finalizada');
  });
});
