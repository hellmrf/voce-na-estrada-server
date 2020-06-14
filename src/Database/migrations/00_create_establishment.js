exports.up = async function up(knex) {
    return await knex.schema.createTable("establishment", (table) => {
        table.increments("id").primary();
        table.string("company_name").notNullable();
        table.string("cnpj", 14).notNullable();
        table.float("latitude", 17, 15).notNullable();
        table.float("longitude", 17, 15).notNullable();
        table.string("email").notNullable().unique();
        table.string("password", 60).notNullable();
        table.boolean("parking").notNullable();
        table.string("image");
        table.string("category");
        table.string("token", 60);
        table.timestamp("token_date");
    });
};

exports.down = async function down(knex) {
    return knex.schema.dropTable("establishment");
};
