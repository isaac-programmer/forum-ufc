const express = require('express');
const router = express.Router();

// Rota para a página inicial
router.get("/", (req, res) => {
    res.redirect("/perguntas");
});

// Rota para categorias com base na query string
router.get("/categorias", (req, res) => {
    const categoria = req.query.categoria;
    switch (categoria) {
        case "tcc":
            res.render("categorias/tcc");
            break;
        case "ru":
            res.render("categorias/ru");
            break;
        case "bolsas":
            res.render("categorias/bolsas");
            break;
        default:
            res.status(404).send("Categoria não encontrada");
    }
});

module.exports = router;