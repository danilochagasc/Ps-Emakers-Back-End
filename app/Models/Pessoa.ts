import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Livro from './Livro'

export default class Pessoa extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public cpf: String

  @column()
  public id_livro: Number | null;
  
  @belongsTo(() => Livro, {foreignKey: 'id_livro'})
  public livro: BelongsTo<typeof Livro>

  @column()
  public nome: String

  @column()
  public emprestimo_disponivel: Boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
