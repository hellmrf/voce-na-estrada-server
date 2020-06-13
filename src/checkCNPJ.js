const axios = require("axios");

/*
 * O endereço abaixo apresenta outra API para validação de CNPJs,
 * mas a que usei funciona bem, então vou deixar como está.
 * https://nfe.io/blog/integracao/consulta-de-cnpj-api/
 */
const checkCNPJ = async (cnpj) => {
    if (!cnpj || String(cnpj).length != 14) {
        return false;
    }
    try {
        const response = await axios.get(
            `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
        );
        return response.data.status === "OK";
    } catch (err) {
        return false;
    }
};

module.exports.checkCNPJ = checkCNPJ;
module.exports.req = async (req, res) => {
    console.log(req.params);
    if (!req.params.cnpj) {
        res.status(400);
        return res.send("No CNPJ.");
    }

    const CNPJ = String(req.params.cnpj).replace(/[^0-9]/gi, "");

    const status = await checkCNPJ(CNPJ);

    res.status(200);
    return res.json({
        status: status,
        cnpj: CNPJ,
    });
};
