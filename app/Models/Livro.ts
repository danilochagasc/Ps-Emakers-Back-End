import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Biblioteca from './Biblioteca'

export default class Livro extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public id_biblioteca: Number

  @belongsTo(() => Biblioteca)
  public biblioteca: BelongsTo<typeof Biblioteca>
  
  @column()
  public nome: String

  @column()
  public quantidade: Number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
