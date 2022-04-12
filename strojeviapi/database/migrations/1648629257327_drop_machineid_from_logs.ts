import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DropMachineidFromLogs extends BaseSchema {
  protected tableName = 'logs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('machine_id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('machine_id').nullable()
    })
  }
}
