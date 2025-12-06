const express = require('express');
const router = express.Router();
const path = require('path')
// router.use(express.static(path.join(__dirname, "../frontend")));

const client = require('../database/conexao');

// Retorna lista de pessoas
// GET
router.get('/lista', function(req, res) {
  // console.log('router: pessoas/lista')
  client.query("SELECT * FROM pessoas")
    .then(result => {
      res.json(result.rows)
    });
})

// Retorna uma pessoa específica
// GET /pessoas/:id
router.get('/unico/:id', function(req, res) {
  const id = req.params.id
  console.log(`pessoas.js: log id /pessoas: ${id}`)

  client.query({
    text: 'SELECT * FROM pessoas WHERE id = $1',
    values: [id]
  })
  .then(function (ret){
    let pessoa = ret.rows[0];
    res.json({
      status: 'OK',
      nome: pessoa.nome,
      idade: pessoa.idade,
      cidade: pessoa.cidade,
      profissao: pessoa.profissao
    });
  });
});

// Cria o registro de uma nova pessoa
//POST /pessoas/cadastro
router.post('/cadastro', function(req, res) {
  client.query({
    text: 'INSERT INTO pessoas (nome, idade, cidade, profissao) VALUES ($1, $2, $3, $4)',
    values: [req.body.nome, req.body.idade, req.body.cidade, req.body.profissao]
  })
  .then(function(ret) {
    res.json({
      status: 'Pessoa cadastrada',
      dadosEnviados: req.body
    });
  });
});

// Atualiza o registro de uma pessoa
//PUT /pessoas/:id
router.put('/atualizar/:id', function(req, res) {
  client.query({
    text: 'UPDATE pessoas SET nome = $1, idade = $2, cidade = $3, profissao = $4 WHERE id = $5',
    values: [req.body.nome, req.body.idade, req.body.cidade, req.body.profissao, req.params.id]
  })
  .then(function(ret) {
    res.json({
      status: 'Atualização efetuada',
      dadosAtualizados: ret.rows[0]
    });
  });
});

// Deleta uma pessoa
//DELETE /pessoas/:id
router.delete('/:id', function(req, res) {
  client.query({
    text: 'DELETE FROM pessoas WHERE id = $1 RETURNING *',
    values: [req.params.id]
  })
  .then(function(ret) {
    res.json({
      status: 'Exclusão realizada',
      dadosDeletados: ret.rows[0]
    });
  });
});

module.exports = router;