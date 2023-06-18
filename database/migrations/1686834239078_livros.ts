import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'livros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
          .integer('id_biblioteca')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('bibliotecas')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
    
      table.string('nome').notNullable();
      table.integer('quantidade').notNullable();
      table.boolean('estoque_disponivel').notNullable();

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
