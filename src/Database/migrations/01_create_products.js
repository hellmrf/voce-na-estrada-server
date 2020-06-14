exports.up = async function up(knex) {
    return await knex.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.integer("company_id").notNullable();
        // .references("id")
        // .inTable("establishment");
        table.string("title").notNullable();
        table.float("price").notNullable();
        table.float("cashback").notNullable();
        table.string("image");
        table.string("description");
    });
};

exports.down = async function down(knex) {
    return knex.schema.dropTable("products");
};
