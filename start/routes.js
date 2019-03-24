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
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('login', 'UserController.login')

Route.post('signup', 'UserController.store')

Route.group(() => {
  Route.resource('messages', 'MessageController')
  Route.get('sent-messages', 'MessageController.getMessagesSentByUser')
  Route.delete('user/:id', 'UserController.delete')
}).middleware('auth')
