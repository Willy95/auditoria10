'use strict'

// Requerimos lo necesario para trabajar
// Encriptado
const Hash = use('Hash')
// Bussiness - Base de datos
const Cuestionario = use('App/Model/Cuestionario')
// Acceder a la base de datos
const Database = use('Database')
// Nos ayuda a acceder a los directorios del sistema
const Helpers = use('Helpers')

class CuestionarioController {

  * renderView(req, res){
    const id = req.param('id')
    return yield res.sendView('cuestionario', { audit: id })

  }
  *  View(req, res){
    const id = req.param('id')
    const response = yield Database.from('audits_has_departments')
    .innerJoin('audits', 'audits_has_departments.audit_id', 'audits.id')
    .innerJoin('questions', 'questions.audit_id', 'audits.id')
    .where({
      'audits_has_departments.active'   : 1,
      'audits_has_departments.audit_id' : id,
      'questions.active'                : 1,
      'audits.active'                   : 1
    })
    .select('questions.*', 'audits_has_departments.business_id', 'audits_has_departments.department_id')
    return yield res.sendView('encuesta', { questions: response  })}

	 * save (req, res){
      var data = req.all()
      // Generamos una INSTANCIA de Company para crear una nueva Bussines en
      // la base de datos. COMPANY SE DECLARA EN LA PARTE DE ARRIBA DE
      // ESTE ARCHIVO
      // ** Se ingresan cada uno de los atributos que tengamos en la base de datos **
      var cuestionario = new Cuestionario()
      cuestionario.question = data.question
      cuestionario.audit_id = data.audit
      cuestionario.active   = 1
      yield cuestionario.save()
      // regresamos un estatus 200, lo que nos indica que todo se ha completado
      // de manera exitos (Puede ser cualquier estatus que se desee, siempre
      // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
      // estandar universal"), y ademas enviamos la información de la empresa que
      // acabamos de registrar.
      return res.send({
        status: 200,
        data: cuestionario
      })
  }

 * getAllCuestionario (req, res){
    const data = req.all()
    // Hacemos la consulta de todas las Cuestionarios que se encuentren activas
    const pregunta = yield Database.from('questions').where({'active':1, 'audit_id':data.id})
    return res.send(pregunta)
  }

 * update (req, res){
    // Obteneos todos los datos que enviamos en el AJAX

    const data = req.all()
    // Revisamos si existe ya una epresa con el folio que estamos enviando
    const query = yield Database.from('questions').where({'question': data.question})
    // En caso de que la empresa exista, regresamos un estatus que nos indique
    // que ya existe y obvio ya no se registra esta empresa
    // EN ESTE CASO VAMOS A COMPARAR QUE EL FOLIO SEA DIFERENTE AL QUE YA TIENE
    // LA EMPRESA QUE VAMOS A ACTUALIZAR
    const toUpdate = yield Database.from('questions').where({'question': data.question})
    if (query.length > 0 && data.question != toUpdate[0].question){
      return res.send({
        'status':1001
      })
    }
    else{
      // Llegamos a esta parte en caso de que la empresa no exista según el
      // folio que se ha ingresado

      // Generaos un pregunta random para la imagen y le concatenamos
      // la extension del archivo al final

      yield Cuestionario.query()
      .where('id', data.id)
      .update({
        question : data.question
      })
      // regresamos un estatus 200, lo que nos indica que todo se ha completado
      // de manera exitos (Puede ser cualquier estatus que se desee, siempre
      // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
      // estandar universal").
      return res.send({ status  : 200 })
    }
  }

   * inactive (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    const data = req.all()
    // No se debe eliminar "NUNCA" ningun registro de la base de datos, esto se
    // hace por seguridad, unicamente se deberá de cambiar el estatus
    yield Cuestionario.query()
    .where('id', data.id)
    .update({ active  : 0 })
    // regresamos un estatus 200, lo que nos indica que todo se ha completado
    // de manera exitos (Puede ser cualquier estatus que se desee, siempre
    // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
    // estandar universal").
    return res.send({ status  : 200 })
  }

}
	module.exports = CuestionarioController
