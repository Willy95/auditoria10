'use strict'

const Hash = use('Hash')
const Company = use('App/Model/Business')
const Database = use('Database')
const Helpers = use('Helpers')

class Business {

  *save(req, res){
    var data = req.all()
    var file = req.file("logo")
    var query = yield Database.from('business').where({'folio':data.folio})
    if (query.length > 0){
      return res.send({
      'status':1001
    })
    }
    else{
      yield file.move(Helpers.storagePath(), file.clientName()+"."+file.extension())
      var business = new Company()
      business.name = data.username
      business.logo = file.clientName()+"."+file.extension()
      business.folio = data.folio
      yield user.save()
      return res.send({
        'status':200
    })

    }

  }

}

module.exports = Business
