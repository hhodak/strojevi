/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.resource('machines', 'MachinesController')
Route.resource('users', 'UsersController')
Route.resource('roles', 'RolesController')
Route.resource('logs', 'LogsController')
Route.post('login', "AuthController.login")
Route.post('logout', "AuthController.logout")
Route.get('user', "AuthController.user")
