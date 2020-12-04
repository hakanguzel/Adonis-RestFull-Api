'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/api/all', 'TodoController.all').middleware('auth')
Route.get('/api/todos', 'TodoController.index').middleware('auth')
Route.post('/api/todos', 'TodoController.store').middleware('auth')
Route.put('/api/todos/:id', 'TodoController.update').middleware('auth')
Route.delete('/api/todos/:id', 'TodoController.destroy').middleware('auth')

Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')
