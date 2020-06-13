const express = require("express");
const routes = express.Router();

const CheckCNPJ = require("./checkCNPJ");
const establishment = require("./Controllers/EstablishmentController");
const EstablishmentController = new establishment();

routes.get("/checkCNPJ/:cnpj", CheckCNPJ.req);

routes.post("/establishment", EstablishmentController.create);

module.exports = routes;
