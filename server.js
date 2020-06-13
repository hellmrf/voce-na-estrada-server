const express = require("express");
const routes = require("./src/routes");
// const cors = require('cors');

const app = express();
app.use(express.json());
app.use(routes);

app.use("/readme.md", express.static("README.md"));

app.listen(3001);
