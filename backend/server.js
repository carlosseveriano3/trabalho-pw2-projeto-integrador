const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pessoasRouter = require('./routes/pessoas');
const path = require('path')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use('/pessoas', pessoasRouter);

const client = require('./database/conexao')

// Retorna todas as pessoas da tabela
// GET /
app.get('/', function(req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/index.html")
  )
})

app.get('/pessoas/:id', function(req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/atualizar.html")
  )
})

app.get('/pessoas/cadastro', function(req, res) {
  res.sendFile(
    path.join(__dirname, '../frontend/cadastro.html')
  )
})

app.listen(3000, function(){console.log('Servidor conectado...')});