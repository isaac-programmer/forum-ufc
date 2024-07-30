const express = require('express');
const router = express.Router();

router.post("/perguntar", (req, res) => {
  const { usuario, pergunta } = req.body;

  //QUANDO O USUÁRIO PERGUNTAR, SALVAR NO BANCO DE DADOS

  //STATUS PERGUNTA

});

router.post("/responder", (req, res) => {
  let usuario = req.body.usuario;
  let resposta = req.body.resposta;

  //QUANDO O USUÁRIO RESPONDER, SALVAR NO BANCO DE DADOS

  //STATUS RESPOSTA
});

router.post("/votar", (req, res) => {
  let id_resposta = req.body.id;
  let voto = req.body.voto;

  //QUANDO O USUÁRIO VOTAR, SALVAR NO BANCO DE DADOS

  //STATUS VOTO
});

router.get("/perguntas/:categoria", (req, res) => {
  let categoria = req.params.categoria;

  //BUSCAR PERGUNTAS NO BANCO DE DADOS

  //ARRAY PERGUNTAS
});

module.exports = router;