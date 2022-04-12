import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from "App/Models/Log";

export default class LogsController {
  public async index({ response }) {
    const logs = await Log.all()
    return await response.ok(logs)
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request, response }) {
    const logInfo = request.only(['user_id', 'action'])

    const log = new Log()
    log.user_id = logInfo.user_id
    log.action = logInfo.action

    await log.save()

    return response.status(201).json(log)
  }

  public async show({ params }) {
    const log = await Log.find(params.id)
    return log
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ params, response, request }) {
    const log = await Log.find(params.id)
    if (log) {
      const logInfo = request.only(['user_id', 'action'])
      log.user_id = logInfo.user_id
      log.action = logInfo.action

      await log.save()

      return response.status(201).json(log)
    }
    else {
      return response.status(404).json("Log does not exist.")
    }
  }

  public async destroy({ params, response }) {
    const log = await Log.find(params.id)
    if (log) {
      await log?.delete()
      response.json({
        message: 'Successfully deleted log!'
      })
    }
    else {
      response.json({
        message: 'Log does not exist.'
      })
    }
  }
}
