exports.up = async function up(knex) {
    return await knex.schema.createTable("ratings", (table) => {
        table.increments("id").primary();
        table.integer("user_id").notNullable();
        // .references("id")
        // .inTable("users");
        table.integer("company_id").notNullable();
        // .references("id")
        // .inTable("establishment");
        table.integer("general_rating").notNullable();
        table.integer("price_rating").notNullable();
        table.string("comment");
    });
};

exports.down = async function down(knex) {
    return knex.schema.dropTable("ratings");
};
