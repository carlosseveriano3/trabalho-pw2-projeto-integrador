function listandoPessoas() {
  $.ajax({
    url: 'http://localhost:3000',
    method: 'GET',
    dataType: 'json',

    success: function(data) {
      let $lista = $('#lista-pessoas');

      $lista.empty();

      for (pessoa of data) {
        $lista.append('<div>' + pessoa.nome + ' | ' + pessoa.idade + ' | ' + pessoa.cidade + ' | ' + pessoa.profissao + ' ' + '<button>' + 'x' + '</button>' + '</div>')
        $lista.append('</br>')
      };
    },

    error: function(xhr, status, error) {
      console.log(error)
    }
  });
};

listandoPessoas()

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