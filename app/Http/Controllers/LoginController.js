'use strict'

class LoginController {

  * login(req, res){
    var data = req.all()

    return res.send({
      'status': 200,
      'data': data
    })
  }

}

module.exports = LoginController
