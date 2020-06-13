const conn = require("../Database/db");
const CheckCNPJ = require("../checkCNPJ");
const Knex = require("../Database/db");
const bcrypt = require("bcrypt");

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

class EstablishmentController {
    async index(request, response) {}
    async detail(request, response) {}
    async create(request, response) {
        try {
            const {
                company_name,
                cnpj,
                latitude,
                longitude,
                email,
                password,
            } = request.body;

            const check_cnpj = await CheckCNPJ.checkCNPJ(cnpj);

            if (!check_cnpj) {
                response.status(400);
                return response.send(
                    "O CNPJ enviado é inválido. Por favor, verifique os dados informados."
                );
            } else if (!validateEmail(email)) {
                response.status(400);
                return response.send(
                    "O Email enviado é inválido. Por favor, verifique os dados informados."
                );
            }

            const password_hashed = await bcrypt.hash(password, 10);

            const data = {
                company_name,
                cnpj,
                latitude,
                longitude,
                email,
                password: password_hashed,
            };

            if (request.body.category) {
                data.category = request.body.category;
            }

            const registeredId = await Knex("establishment").insert(data);

            return response.send({
                status: true,
                message: "",
            });
        } catch (err) {
            console.log(err);
            response.status(400);
            return response.json({
                status: false,
                message:
                    "Por favor, verifique a rota /readme.md para informações sobre como utilizar esta rota.",
            });
        }
    }
}

module.exports = EstablishmentController;
