'use strict'

const Lucid = use('Lucid')

class AuditsHasDepartments extends Lucid {

  // Le especificamos la tabla a la que se va a conectar
  static get table(){
    return 'audits_has_departments'
  }

}

module.exports = AuditsHasDepartments
