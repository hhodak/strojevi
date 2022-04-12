import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";

export default class UsersController {
  public async index({ response }) {
    const users = await User.all()
    return await response.ok(users)
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request, response }) {
    const userInfo = request.only(['username', 'password', 'fullName', 'email', 'role_id', 'isActive', 'status'])

    const user = new User()
    user.username = userInfo.username
    user.password = userInfo.password
    user.fullName = userInfo.fullName
    user.email = userInfo.email
    user.role_id = userInfo.role_id
    user.isActive = userInfo.isActive
    user.status = userInfo.status

    await user.save()

    return response.status(201).json(user)
  }

  public async show({ params }) {
    const user = await User.find(params.id)
    return user
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ params, response, request }) {
    const user = await User.find(params.id)
    if (user) {
      const userInfo = request.only(['username', 'password', 'fullName', 'email', 'role_id', 'isActive', 'status'])
      user.username = userInfo.username
      user.password = userInfo.password
      user.fullName = userInfo.fullName
      user.email = userInfo.email
      user.role_id = userInfo.role_id
      user.isActive = userInfo.isActive
      user.status = userInfo.status

      await user.save()

      return response.status(201).json(user)
    }
    else {
      return response.status(404).json("User does not exist.")
    }
  }

  public async destroy({ params, response }) {
    const user = await User.find(params.id)
    if (user) {
      await user?.delete()
      response.json({
        message: 'Successfully deleted user!'
      })
    }
    else {
      response.json({
        message: 'User does not exist.'
      })
    }
  }
}
