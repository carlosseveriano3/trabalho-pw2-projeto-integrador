const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pessoasRouter = require('./routes/pessoas');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/pessoas', pessoasRouter);

const client = require('./database/conexao')

// Retorna todas as pessoas da tabela
// GET /
app.get('/', function(req, res) {
  client.query("SELECT * FROM pessoas")
    .then(
      function(ret){
        res.send(ret.rows)
    }
  );
})

app.listen(3000, function(){console.log('Servidor conectado...')});