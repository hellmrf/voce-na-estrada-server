const express = require("express");
const routes = express.Router();
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const EstablishmentController = require("./Controllers/EstablishmentController");
const ProductsController = require("./Controllers/ProductsController");
const CheckCNPJ = require("./checkCNPJ");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.resolve(__dirname, "..", "public", "uploads"));
    },
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            callback(
                null,
                raw.toString("hex") + path.extname(file.originalname)
            );
        });
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const acceptedMimes = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/gif",
        ];
        if (acceptedMimes.indexOf(file.mimetype) === -1) {
            callback(new Error("MIME type não permitido."), false);
        } else {
            callback(null, true);
        }
    },
});
const establishment = new EstablishmentController();
const products = new ProductsController();

//

routes.get("/checkCNPJ/:cnpj", CheckCNPJ.req);

routes.post("/establishment/login", establishment.getToken);

routes.patch(
    "/establishment/:id/image",
    upload.single("image"),
    establishment.addImage
);

routes.get("/establishment", establishment.index);

routes.post("/establishment", establishment.create);

routes.get("/establishment/:id", establishment.detail);

routes.get("/products/:establishment_id", products.index);

module.exports = routes;
