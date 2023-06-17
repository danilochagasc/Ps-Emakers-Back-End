import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bibliotecas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('cnpj', 18).notNullable().unique();
      table
          .integer('id_livro')
          .unsigned()
          .nullable()
          .references('id')
          .inTable('livros')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      table.string('nome').notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
