const express = require('express');
const router = express.Router();
const {Pergunta, Resposta, Like} = require('../database/models/PerguntasRespostas');
const Usuario = require('../database/models/Usuario');
const sequelize = require('../database/db');

router.get("/", (req, res) => {
  res.redirect("/perguntas");
});

router.post("/perguntar", async (req, res) => {
  try {
    const { nome, email, pergunta, categoria, descricao } = req.body;

    // Verifica se todos os dados necessários estão presentes
    if (!pergunta || !categoria) {
      return res.status(400).json({ error: 'Pergunta e categoria são obrigatórios.' });
    }

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios para criar um novo usuário.' });
    }
    // Salva o Usuário
    let usuario = await Usuario.create({ nome, email });

    // Cria e salva a nova pergunta
    const novaPergunta = await Pergunta.create({
      usuario_id: usuario.id,
      pergunta,
      categoria,
      descricao
    });

    res.status(201).json(novaPergunta);
  } catch (error) {
    console.error('Erro ao salvar pergunta:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

router.post("/responder", async (req, res) => {
  try {
    const { nome, email, resposta, pergunta_id } = req.body;

    // Verifica se todos os dados necessários estão presentes
    if (!pergunta_id || !resposta) {
      return res.status(400).json({ error: 'Resposta é obrigatória.' });
    }

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios para criar um novo usuário.' });
    }
    
    // Salva o Usuário
    let usuario = await Usuario.create({ nome, email });

    // Cria e salva a nova resposta
    const novaResposta = await Resposta.create({
      usuario_id: usuario.id,
      resposta,
      pergunta_id,
      likes: 0,
      dislikes: 0,
    });

    res.status(201).json(novaResposta);
  } catch (error) {
    console.error('Erro ao salvar pergunta:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

router.post("/votar", async (req, res) => {
  const { nome, email, voto, resposta_id } = req.body;

  // Verifica se todos os dados necessários estão presentes
  if (!resposta_id || !voto) {
    return res.status(400).json({ error: 'Voto é obrigatório.' });
  }

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios para criar um novo usuário.' });
  }

  try {
    // Verifica se o usuário já existe
    let usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      // Cria o usuário se não existir
      usuario = await Usuario.create({ nome, email });
    }

    const resposta = await Resposta.findByPk(resposta_id);

    // Verifica se a resposta existe
    if (!resposta) {
      return res.status(404).json({ error: 'Resposta não encontrada.' });
    }

    // Cria ou atualiza o voto na tabela Likes
    const [like, created] = await Like.findOrCreate({
      where: { usuario_id: usuario.id, resposta_id },
      defaults: { tipo: voto }
    });

    if (!created) {
      // Se o voto já existir, atualiza o tipo de voto
      like.tipo = voto;
      await like.save();
    }

    res.json({ message: 'Voto registrado com sucesso.', like });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar o voto.' });
  }
});

router.get("/perguntas", async (req, res) => {
  const { categoria } = req.query;

  // Configurações para a consulta
  let whereClause = {};

  // Adiciona condição ao whereClause se categoria for fornecida
  if (categoria) {
    whereClause.categoria = categoria;
  }

  try {
    // Buscar perguntas com condições dinâmicas
    const perguntas = await Pergunta.findAll({
      where: Object.keys(whereClause).length ? whereClause : undefined, // Se não houver condições, omitir where
      include: [
        {
          model: Resposta,
          as: 'respostas',
        }
      ]
    });

    res.render("index", {perguntas, perguntas});
  } catch (error) {
    console.error('Erro ao buscar perguntas:', error);
    res.status(500).json({ error: 'Erro ao buscar perguntas' });
  }
});

router.get("/pergunta/:id", async (req, res) => {
  const id = req.params.id;
  const { ordem } = req.query;

  try {
    // Define a ordenação com base no parâmetro 'ordem', padrão é DESC
    const order = ordem === 'ASC' ? 1 : -1;  // ASC: crescente, DESC: decrescente

    const perguntas = await Pergunta.findOne({
      where: { id: id },
      include: [
        {
          model: Resposta,
          as: 'respostas',
          include: [
            {
              model: Usuario,
              as: 'usuarios',
            }
          ],
          attributes: {
            include: [
              [
                sequelize.literal(`(
                  SELECT COUNT(*) FROM likes
                  WHERE likes.resposta_id = respostas.id
                  AND likes.tipo = 'like'
                )`),
                'likes'
              ],
              [
                sequelize.literal(`(
                  SELECT COUNT(*) FROM likes
                  WHERE likes.resposta_id = respostas.id
                  AND likes.tipo = 'dislike'
                )`),
                'dislikes'
              ]
            ]
          },
        }
      ],
    });

    const pergunta = {
      id: perguntas.dataValues.id,
      pergunta: perguntas.dataValues.pergunta,
      usuario_id: perguntas.dataValues.usuario_id,
      categoria: perguntas.dataValues.categoria,
      descricao: perguntas.dataValues.descricao,
      data_criacao: perguntas.dataValues.data_criacao,
      respostas: perguntas.dataValues.respostas
        .map(resposta => ({
          id: resposta.dataValues.id,
          resposta: resposta.dataValues.resposta,
          likes: resposta.dataValues.likes || 0,
          dislikes: resposta.dataValues.dislikes || 0,
          usuarios: {
            nome: resposta.dataValues.usuarios.nome,
            email: resposta.dataValues.usuarios.email
          }
        }))
        .sort((a, b) => (a.likes - b.likes) * order)  // Ordena pelas respostas
    };

    res.render("pergunta", { pergunta });
  } catch (error) {
    console.error(`Erro ao buscar pergunta ${id}:`, error);
    res.status(500).json({ error: `Erro ao buscar pergunta ${id}` });
  }
});

module.exports = router;