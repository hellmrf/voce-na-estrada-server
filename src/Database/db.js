// const mysql = require("mysql");
// const databaseCredentials = require("../../credentials/database.json");

// const connection = mysql.createPool(databaseCredentials);

// connection.connect((err) => {
//     if (err) throw err;
// });

// module.exports = connection;

const knex = require("knex");
// import path from 'path';
const databaseCredentials = require("../../credentials/database.json");

const connection = knex({
    client: "mysql",
    connection: databaseCredentials,
});

module.exports = connection;
