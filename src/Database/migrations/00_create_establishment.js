const Knex = require("knex");

exports.up = async function up(knex) {
    return knex.schema.createTable("establishment", (table) => {
        table.increments("id").primary();
        table.string("company_name").notNullable();
        table.string("cnpj", 14).notNullable();
        table.float("latitude").notNullable();
        table.float("longitude").notNullable();
        table.string("email").notNullable();
        table.binary("password", 60).notNullable();
        table.string("image");
        table.string("category");
    });
};

exports.down = async function down(knex) {
    return knex.schema.dropTable("establishment");
};
