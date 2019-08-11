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

Route.put('/api/todos/:id', 'TodoController.update')
Route.delete('/api/todos/id', 'TodoController.destroy')
Route.post('/api/todos', 'TodoController.store')
Route.get('/api/todos', 'TodoController.index')
Route.get('/api/all', 'TodoController.all')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
