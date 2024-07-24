
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/:nome/:disciplina", (req, res) => {
    var nome = req.params.nome;
    var disciplina = req.params.disciplina;
    var exibirMsg = false;
    var produtos = [
        { nome: "Telefone", preco: 200 },
        { nome: "Maça", preco: 2.50 },
        { nome: "Carro", preco: 2000.50 },
    ];

    res.render("index", {
        nome: nome,
        disciplina: disciplina,
        empresa: "UFC",
        alunos: 40,
        msg: exibirMsg,
        produtos: produtos
    });
});

app.listen(8000, () => {
    console.log("App rodando!");
})