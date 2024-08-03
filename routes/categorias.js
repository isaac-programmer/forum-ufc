const express = require('express');
const router = express.Router();

// Rota para a página inicial
router.get("/home", (req, res) => {
    res.render("index");
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

// Rota para perguntas com base na query string
router.get("/perguntas", (req, res) => {
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
