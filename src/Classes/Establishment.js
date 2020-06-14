const Knex = require("../Database/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class Establishment {
    async login(email, password) {
        if (!email || !password) {
            return {
                status: false,
                error: 401,
                message: "Email e senha são obrigatórios.",
            };
        }

        const password_hash_response = await Knex("establishment")
            .where({ email })
            .select("password", "id");

        const id = password_hash_response[0].id;
        const password_hash = password_hash_response[0].password.toString();

        console.log(password, password_hash);
        const authorized = await bcrypt.compare(
            String(password),
            password_hash
        );

        console.log(authorized);

        if (authorized === true) {
            //login
            const token = crypto.pseudoRandomBytes(16).toString("hex");
            const token_hash = await bcrypt.hash(token, 10);
            const token_date = String(new Date().getTime());
            try {
                await Knex("establishment")
                    .where({ email })
                    .update({
                        token: token_hash,
                    })
                    .limit(1);
                return {
                    status: true,
                    message: "",
                    token,
                    id,
                };
            } catch (err) {
                console.log(err);
                return {
                    status: false,
                    error: 500,
                    message: "Erro interno.",
                };
            }
        } else {
            return {
                status: false,
                error: 403,
                message: "Email ou senha incorretos",
            };
        }
    }
    async authenticate(email, token) {
        if (!email || !token) {
            return {
                status: false,
                error: 401,
                message: "Token e email obrigatórios.",
            };
        }

        const token_hash_response = await Knex("establishment")
            .where({ email })
            .select("token");

        const token_hash = token_hash_response[0].token.toString();

        const authorized = await bcrypt.compare(String(token), token_hash);

        if (authorized === true) {
            return {
                status: true,
                message: "",
            };
        } else {
            return {
                status: false,
                error: 403,
                message: "Não autenticado.",
            };
        }
    }
}

module.exports = Establishment;
