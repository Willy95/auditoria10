'use strict'

const Hash = use('Hash')

class LoginController {

  * login(req, res){
    var data = req.all()

    return res.send({
      'status': 200,
      'data': data,
      'pass': yield Hash.make(data.password)
    })
  }

}

module.exports = LoginController
