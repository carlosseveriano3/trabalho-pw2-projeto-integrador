const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const client = require('./database/conexao')
client.connect();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const pessoas = client.query("SELECT * FROM pessoas")
    .then(
      function(ret){
        res.send(ret.rows)
    }
  );
})

app.listen(3000);