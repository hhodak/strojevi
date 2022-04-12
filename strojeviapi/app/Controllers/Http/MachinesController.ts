import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Machine from "App/Models/Machine";

export default class MachinesController {
  public async index({ response }) {
    const machines = await Machine.all()
    return await response.ok(machines)
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request, response }) {
    const machineInfo = request.only(['name', 'description', 'state'])

    const machine = new Machine()
    machine.name = machineInfo.name
    machine.description = machineInfo.description
    machine.state = machineInfo.state

    await machine.save()

    return response.status(201).json(machine)
  }

  public async show({ params }) {
    const machine = await Machine.find(params.id)
    return machine
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ params, response, request }) {
    const machine = await Machine.find(params.id)
    if (machine) {
      const machineInfo = request.only(['name', 'description', 'state'])
      machine.name = machineInfo.name
      machine.description = machineInfo.description
      machine.state = machineInfo.state

      await machine.save()

      return response.status(201).json(machine)
    }
    else {
      return response.status(404).json("Machine does not exist.")
    }
  }

  public async destroy({ params, response }) {
    const machine = await Machine.find(params.id)
    if (machine) {
      await machine?.delete()
      response.json({
        message: 'Successfully deleted machine!'
      })
    }
    else {
      response.json({
        message: 'Machine does not exist.'
      })
    }
  }
}
