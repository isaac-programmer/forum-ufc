
const express = require("express");
const app = express();
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
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
//Rota de receber dados do formulario de login
app.post("/validarlogin",(req,res)=>{
    //var user = req.body.usuario;
    //var senha = req.body.senha;
})

//Rota de receber dados do formulario de login

//Rota que recebe dados do formulario de cadastro de perguntas
app.post("/rotaFazerPergunta",(req,res)=>{
    //var user = req.body.usuario;
    var senha = req.body.senha;
})

//Rota que recebe dados do formulario de cadastro de resposta
app.post("/rotaResposta",(req,res)=>{

})

app.listen(8000, () => {
    console.log("App rodando!");
})