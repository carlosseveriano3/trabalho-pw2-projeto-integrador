// GET
function listandoPessoas() {
  console.log('main.js: listando')
  $.ajax({
    url: 'http://localhost:3000/pessoas/lista',
    method: 'GET',
    dataType: 'json',

    success: function(data) {
      let $lista = $('#lista-pessoas');

      $lista.empty();

      for (pessoa of data) {
        $lista.append(
          '<a id="" href="/pessoa-unica">'
            + pessoa.nome + ' | ' 
            + pessoa.idade + ' | ' 
            + pessoa.cidade + ' | ' 
            + pessoa.profissao + ' ' 
              + '<button>' 
                + 'x' 
              + '</button>' + 
          '</a>'
        )
        
        $lista.append('</br>')
      };
    },

    error: function(xhr, status, error) {
      console.log(error)
    }
  });
};

listandoPessoas()

if (location.pathname.endsWith('atualizar.html')) {

  function Pessoa() {
    console.log('main.js: atualizar.html')
    $.ajax({
      url: 'http://localhost:3000/pessoas/:id',
      method: 'GET',
      dataType: 'json',

      success: function(data) {
        let $pessoaElemento = $('#pessoa');

        $pessoaElemento.empty();

        for (pessoa of data) {
          $pessoa.append(
            '<div>'
              + pessoa.nome + ' | ' 
              + pessoa.idade + ' | ' 
              + pessoa.cidade + ' | ' 
              + pessoa.profissao + ' ' 
                + '<button>' 
                  + 'x' 
                + '</button>' + 
            '</div>'
          )
          
          $pessoaElemento.append('</br>')
        };
      },

      error: function(xhr, status, error) {
        console.log(error)
      }
    });
  };

  Pessoa()
}

//POST
$('#formularioPessoa').on('submit', function(e) {
  e.preventDefault();

  const dadoFormulario = {
    nome: $('#nome').val(),
    idade: $('#idade').val(),
    cidade: $('#cidade').val(),
    profissao: $('#profissao').val()
  };

  console.log(dadoFormulario)

  $.ajax({
    url: 'http://localhost:3000/pessoas/cadastro',
    type: 'POST',
    data: JSON.stringify(dadoFormulario),
    contentType: 'application/json; charset=utf-8', 
    dataType: 'json',
    success: function(data) {
      $('#resultado').text('Pessoa cadastrada com sucesso!')
    }
  })
});