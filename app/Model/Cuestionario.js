'use strict'

const Lucid = use('Lucid')

class Cuestionario extends Lucid {

  // Le especificamos la tabla a la que se va a conectar
  static get table(){
    return 'questions'
  }

}

module.exports = Cuestionario
