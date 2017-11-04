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
Route.on('/register').render('register')
Route.on('/dashboard').render('templates.dashboard')
// Route.on('/example').render('example')
Route.on('/empresas').render('empresas')

//Route.on('/dashboard').render('templates.opciones') ejercico de ruta

Route.post('/login', 'LoginController.login')
Route.get('/logout', 'LoginController.logout')
Route.post('/reg', 'LoginController.reg')
