'use strict'

// Requerimos lo necesario para trabajar
// Encriptado
const Hash = use('Hash')
// Bussiness - Base de datos
const Department = use('App/Model/Department')
const Business = use('App/Model/Business')
const Audits = use('App/Model/Auditoria')
const Relation = use('App/Model/AuditsHasDepartments')
// Acceder a la base de datos
const Database = use('Database')
// Nos ayuda a acceder a los directorios del sistema
const Helpers = use('Helpers')

class RelacionController {

  * renderView(req, res){
    const business = yield Database.from('business').where({'active':1})
    const audits = yield Database.from('audits').where({'active':1})
    return yield res.sendView('relations', { business: business, audits: audits })
  }
  * save (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    var data = req.all()
    // Obtenemos la imagen, de esta manera ya que es un archivo y no
    // solo es texto como la Información anterior
    // En caso de que la empresa exista, regresamos un estatus que nos indique
    // que ya existe y obvio ya no se registra esta empresa
      // ** Se ingresan cada uno de los atributos que tengamos en la base de datos **
      var relation = new Relation()
      relation.audit_id = data.audit_id
      relation.business_id = data.business_id
      relation.department_id = data.department_id
      relation.active = 1
      yield relation.save()
      return res.send({
        status : 200,
        data : relation
      })
      // regresamos un estatus 200, lo que nos indica que todo se ha completado
      // de manera exitos (Puede ser cualquier estatus que se desee, siempre
      // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
      // estandar universal"), y ademas enviamos la información de la empresa que
      // acabamos de registrar.
    }

* getAllRelation (req, res){
  // Hacemos la consulta de todas las empresas que se encuentren activas
  const data = req.all()
  const audits_has_departments = yield Database.from('audits_has_departments')
  .innerJoin('departments', 'audits_has_departments.department_id', 'departments.id')
  .innerJoin('business', 'audits_has_departments.business_id', 'business.id')
  .innerJoin('audits', 'audits_has_departments.audit_id', 'audits.id')
  .select('audits_has_departments.*', 'departments.name as department', 'business.name as business', 'audits.name as audit')
  .where({
    'departments.active': 1,
    'business.active': 1,
    'audits.active': 1,
    'audits_has_departments.active': 1
  })
  return res.send(audits_has_departments)

  }
  * update (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    const data = req.all()
    // Revisamos si existe ya una epresa con el folio que estamos enviando
    const query = yield Database.from('departments').where({'business_id': data.id})
    // En caso de que la empresa exista, regresamos un estatus que nos indique
    // que ya existe y obvio ya no se registra esta empresa
    // EN ESTE CASO VAMOS A COMPARAR QUE EL FOLIO SEA DIFERENTE AL QUE YA TIENE
    // LA EMPRESA QUE VAMOS A ACTUALIZAR
    const toUpdate = yield Database.from('departments').where({'business_id': data.id})
    if (query.length > 0){
      return res.send({
        'status':1001
      })
    }
    else{
      // Usando el Modelo, hacemos una condicion de actualizacion, donde indicamos
      // que se actualizará por ID y cuales serán los valores
      yield Department.query()
      .where('id', data.id)
      .update({
        name  : data.nombre,
        user_id: data.username,
        description: data.description,
        aka: data.aka,
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
    yield Relation.query()
    .where('id', data.id)
    .update({ active  : 0 })
    // regresamos un estatus 200, lo que nos indica que todo se ha completado
    // de manera exitos (Puede ser cualquier estatus que se desee, siempre
    // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
    // estandar universal").
    return res.send({ status  : 200 })
  }
  * getCompany(req, res){
    var data = req.all()
    const departments = yield Database.from('departments').where({'active':1, 'business_id': data.id})
    return res.send({
        'status':200,
        data: departments
      })
  }
}
module.exports = RelacionController
