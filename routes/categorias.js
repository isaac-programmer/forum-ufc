const express = require('express');
const router = express.Router();

// Rota para a página inicial
router.get("/", (req, res) => {
    res.render("home");
});

router.get("/categoria", (req, res) => {
    const categoria = req.query.categoria;
    switch (categoria) {
        case "tcc":
            res.render("categorias/tcc");
            break;
        case "restaurante":
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