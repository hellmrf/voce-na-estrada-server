const CheckCNPJ = require("../checkCNPJ");
const Knex = require("../Database/db");
const bcrypt = require("bcrypt");

const Establishment = require("../Classes/Establishment");

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

class EstablishmentController {
    async index(request, response) {
        const { latitude, longitude, radius = 5 } = request.query || null;
        try {
            let result;
            if (latitude && longitude) {
                // Dividir a distância por 111.111 resulta na diferença de latlong.
                const delta = parseFloat(radius) / 222.222;
                const minLat = parseFloat(latitude) - delta;
                const maxLat = parseFloat(latitude) + delta;
                const minLong = parseFloat(longitude) - delta;
                const maxLong = parseFloat(longitude) + delta;
                console.log("long:", [minLong, maxLong], "lat:", [
                    minLat,
                    maxLat,
                ]);
                result = await Knex("establishment")
                    .whereBetween("longitude", [minLong, maxLong])
                    .whereBetween("latitude", [minLat, maxLat])
                    .select(
                        "id",
                        "company_name",
                        "cnpj",
                        "latitude",
                        "longitude",
                        "email",
                        "image",
                        "category",
                        "parking"
                    );
            } else {
                result = await Knex("establishment").select(
                    "id",
                    "company_name",
                    "cnpj",
                    "latitude",
                    "longitude",
                    "email",
                    "image",
                    "category",
                    "parking"
                );
            }
            result = result.map((item) => {
                return { ...item, parking: item.parking === 1 };
            });
            return response
                .status(200)
                .send({ status: true, message: "", data: result });
        } catch (err) {
            console.log(err);
            return response
                .status(500)
                .send({ status: false, message: "Erro não tratado." });
        }
    }
    async detail(request, response) {
        if (!request.params.id) {
            return response.status(400).send({
                status: false,
                message: "O ID do estabelecimento é obrigatório.",
            });
        }

        const { id } = request.params;

        try {
            const result = await Knex("establishment")
                .where({ id })
                .select(
                    "id",
                    "company_name",
                    "cnpj",
                    "latitude",
                    "longitude",
                    "email",
                    "image",
                    "category",
                    "parking"
                );
            const parking = result[0].parking ? true : false;
            return response.status(200).send({
                status: true,
                message: "",
                data: { ...result[0], parking },
            });
        } catch (err) {
            return response.status(500).send({
                status: false,
                message: "Erro não tratado.",
            });
        }
    }
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

            const parking = request.body.parking ? 1 : 0;

            const cnpj_onlynumbers = String(cnpj).replace(/[^0-9]/gi, "");

            const check_cnpj = await CheckCNPJ.checkCNPJ(cnpj_onlynumbers);

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

            const password_hashed = await bcrypt.hash(String(password), 10);

            const data = {
                company_name,
                cnpj,
                latitude,
                longitude,
                email,
                password: password_hashed,
                parking,
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
    async addImage(request, response) {
        if (!request.params.id) {
            return response.status(400).send({
                status: false,
                message: "O ID do estabelecimento é obrigatório.",
            });
        } else if (!request.file) {
            return response.status(400).send({
                status: false,
                message: "O arquivo é obrigatório.",
            });
        }

        const { id } = request.params;
        const { filename } = request.file;

        try {
            await Knex("establishment")
                .where({ id })
                .update({ image: filename });
            return response.status(200).send({ status: true, message: "" });
        } catch (err) {
            return response
                .status(500)
                .send({ status: false, message: "Erro não tratado." });
        }
    }
    async getToken(request, response) {
        if (!request.body.email || !request.body.password) {
            return response
                .status(401)
                .send(
                    "Confira /readme.md para a utilização correta desta rota."
                );
        }
        const { email, password } = request.body;

        const establishment = new Establishment();

        const login = await establishment.login(email, password);

        if (login.status === true) {
            return response.status(200).json({ ...login });
        } else {
            return response.status(login.error).json({ ...login });
        }
    }
}

module.exports = EstablishmentController;
