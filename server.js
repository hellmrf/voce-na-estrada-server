const express = require("express");
const routes = require("./src/routes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/readme.md", express.static("README.md"));

app.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Não autenticado." });
    } else if (
        req.headers.authorization !== "3502776c1707884a6b09ac4f450564d1"
    ) {
        return res.status(403).json({ error: "Acesso não autorizado." });
    }
    next();
});

app.use(express.json());

app.use(routes);

app.listen(3001);
