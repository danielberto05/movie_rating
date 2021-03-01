import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users_ratings', table => {
        table.increments('id').primary();
        table.integer('rating').notNullable();
        table.string('comment').defaultTo('');

        table.integer('movie_id')
            .notNullable()
            .references('id')
            .inTable('movies')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        table.timestamp('timestamp')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users_ratings');
}
