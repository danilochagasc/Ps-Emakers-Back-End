import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Biblioteca extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public cnpj: String

  @column()
  public nome: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
