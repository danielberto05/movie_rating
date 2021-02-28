import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('movies', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('director').notNullable();
        table.string('release_year').notNullable();
        table.string('genre').notNullable();
        table.string('mpaa_rating').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('movies');
}
