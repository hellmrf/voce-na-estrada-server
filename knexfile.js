// Roda com `npx knex migrate:latest --knexfile knexfile.ts`
const path = require("path");
const database = require("./credentials/database.json");

module.exports = {
    client: "mysql",
    connection: database,
    migrations: {
        directory: path.resolve(__dirname, "src", "Database", "migrations"),
    } /*,
    seeds: {
        directory: path.resolve(__dirname, "src", "database", "seeds"),
    },*/,
};
