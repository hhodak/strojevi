import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from "App/Models/Role";

export default class RolesController {
  public async index({ response }) {
    const roles = await Role.all()
    return await response.ok(roles)
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request, response }) {
    const roleInfo = request.only(['name', 'description'])

    const role = new Role()
    role.name = roleInfo.name
    role.description = roleInfo.description

    await role.save()

    return response.status(201).json(role)
  }

  public async show({ params }) {
    const role = await Role.find(params.id)
    return role
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ params, response, request }) {
    const role = await Role.find(params.id)
    if (role) {
      const roleInfo = request.only(['name', 'description'])
      role.name = roleInfo.name
      role.description = roleInfo.description

      await role.save()

      return response.status(201).json(role)
    }
    else {
      return response.status(404).json("Role does not exist.")
    }
  }

  public async destroy({ params, response }) {
    const role = await Role.find(params.id)
    if (role) {
      await role?.delete()
      response.json({
        message: 'Successfully deleted role!'
      })
    }
    else {
      response.json({
        message: 'Role does not exist.'
      })
    }
  }
}
