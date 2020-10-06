exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();      
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();      
        table.string('pedido_id').notNullable();      
        table.foreign('pedido_id').references('id').inTable('pedidos');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
  };