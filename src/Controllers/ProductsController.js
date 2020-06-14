const Knex = require("../Database/db");

class ProductsController {
    async index(request, response) {
        if (!request.params.establishment_id) {
            return response.status(400).json({
                status: false,
                message:
                    "Veja na documentação em /readme.md a utilização desta rota.",
            });
        }
        const id = request.params.establishment_id;
        try {
            const result = await Knex("products")
                .where({ company_id: id })
                .select(
                    "id",
                    "title",
                    "price",
                    "cashback",
                    "image",
                    "description"
                );
            return response
                .status(200)
                .json({ status: true, message: "", data: result });
        } catch (err) {
            console.log(err);
            return response
                .status(500)
                .json({ status: false, message: "Erro interno de servidor." });
        }
    }
}

module.exports = ProductsController;
