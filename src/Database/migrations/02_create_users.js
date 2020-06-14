exports.up = async function up(knex) {
    return await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("password", 60).notNullable();
        table.string("token", 60);
        table.timestamp("token_date");
    });
};

exports.down = async function down(knex) {
    return knex.schema.dropTable("users");
};
