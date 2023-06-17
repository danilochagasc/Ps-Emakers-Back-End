import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Livro from './Livro'

export default class Biblioteca extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public cnpj: String

  @column()
  public id_livro: Number

  @belongsTo(() => Livro)
  public livro: BelongsTo<typeof Livro>

  @column()
  public nome: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
