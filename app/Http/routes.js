'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')
Route.on('/dashboard').render('templates.dashboard')
Route.on('/register').render('register')
Route.on('/empresas').render('empresas')
Route.on('/auditor').render('auditor')
Route.on('/auditoria').render('auditoria')
Route.on('/departamento').render('departamento')
Route.on('/cuestionario').render('cuestionario')

//Route.on('/dashboard').render('templates.opciones') ejercico de ruta

Route.post('/login', 'LoginController.login')
Route.get('/logout', 'LoginController.logout')
Route.post('/reg', 'LoginController.reg')
Route.get('/department/:id', 'DepartmentController.renderView')
Route.on('/cuestionario/:id').render('cuestionario')

// Rutas especificas para la gestion de las empresas
Route.post('/savebusiness', 'BusinessController.save')
Route.post('/getAllBusiness', 'BusinessController.getAllBusiness')
Route.post('/updateBusiness', 'BusinessController.update')
Route.post('/inactivebusiness', 'BusinessController.inactive')

// Rutas Auditor 

Route.post('/updateAuditor', 'AuditorController.update')
Route.post('/getAllAuditor', 'AuditorController.getAllAuditor')
Route.post('/inactiveAuditor', 'AuditorController.inactive')
Route.post('/saveAuditor', 'AuditorController.save')


// Rutas Auditoria 
Route.post('/saveauditoria', 'auditoriaController.save')
Route.post('/getAllAuditoria', 'auditoriaController.getAllAuditoria')
Route.post('/updateaudits', 'auditoriaController.update')
Route.post('/inactiveaudits', 'auditoriaController.inactive')

//Rutas Departamento
Route.post('/savedepartments', 'DepartmentController.save')
Route.post('/getAllDepartments', 'DepartmentController.getAllDepartment')
Route.post('/updatedepartments', 'DepartmentController.update')
Route.post('/inactivedepartments', 'DepartmentController.inactive')

//Rutas Cuestionario
Route.post('/savecuestionario', 'CuestionarioController.save')
Route.post('/getAllCuestionario', 'CuestionarioController.getAllCuestionario')
Route.post('/updatecuestionario', 'CuestionarioController.update')
Route.post('/inactivecuestionario', 'CuestionarioController.inactive')