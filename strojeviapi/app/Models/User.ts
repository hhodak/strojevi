import { DateTime } from 'luxon'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Hash from "@ioc:Adonis/Core/Hash";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public username: String

  @column()
  public email: String

  @column()
  public password: String

  @column({ columnName: 'fullName' })
  public fullName: String

  @column()
  public role_id: Number

  @column({ columnName: 'isActive' })
  public isActive: Boolean

  @column()
  public status: String

  @column()
  public remember_me_token: String

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password.toString());
    }
  }
}
