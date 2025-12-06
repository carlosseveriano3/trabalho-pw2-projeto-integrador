console.log('início main.js')

//Lista de pessoas
// GET
function listandoPessoas() {
  // console.log('main.js: listandoPessoas()')
  $.ajax({
    url: 'http://localhost:3000/pessoas/lista',
    method: 'GET',
    dataType: 'json',

    success: function(data) {
      // console.log('sucesso')
      let $lista = $('#lista-pessoas');

      $lista.empty();

      for (pessoa of data) {
        $lista.append(
          '<div class="pessoa-item" data-id="' + pessoa.id + '">' +
            '<a class="a-item" href="/pessoas/' + pessoa.id + '">' +
              'nome: ' + pessoa.nome + '<br />' +
              'idade: ' + pessoa.idade + '<br />' +
              'cidade: ' + pessoa.cidade + '<br />' +
              'profissao ' + pessoa.profissao +
            '</a>' +
            '<button class="botao-deletar" data-id="' + pessoa.id + '">x</button>' +
          '</div>'  
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

//Apenas um pessoa
//GET
function Pessoa() {
  const url = location.pathname.split('/');
  const id = url[2]

  console.log('main.js: atualizar.html')
  $.ajax({
    url: `http://localhost:3000/pessoas/unico/${id}`,
    method: 'GET',
    dataType: 'json',

    success: function(data) {
      let $pessoaElemento = $('#atualizarPessoa');

      $pessoaElemento.empty();

        $pessoaElemento.append(
          '<div>'
            + data.nome + ' | ' 
            + data.idade + ' | ' 
            + data.cidade + ' | ' 
            + data.profissao + ' ' 
              + '<button >' 
                + 'x' 
              + '</button>' + 
          '</div>'
        )
        
        $pessoaElemento.append('</br>')
    },

    error: function(xhr, status, error) {
      console.log(error)
    }
  });
};

const urlPessoa = location.pathname.split('/');
const idPessoa = urlPessoa[2]
if (location.pathname.endsWith(`/pessoas/${idPessoa}`)){
  console.log('Pessoa()')
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

//PUT
$('#formularioAtualizarPessoa').on('submit', function(e) {
  e.preventDefault();

  const dadoFormulario = {
    nome: $('#nome').val(),
    idade: $('#idade').val(),
    cidade: $('#cidade').val(),
    profissao: $('#profissao').val()
  };

  const url = location.pathname.split('/');
  const id = url[2]

  $.ajax({
    url: `http://localhost:3000/pessoas/atualizar/${id}`,
    type: 'PUT',
    data: JSON.stringify(dadoFormulario),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      $('#resultado').text('Pessoa atualizada com sucesso!')
    }
  })
})

//DELETE
$('#lista-pessoas').on('click', '.botao-deletar', function (e) {
  e.preventDefault();

  const $btn  = $(this);
  const id    = $btn.data('id');
  const $item = $btn.closest('.pessoa-item');

  $.ajax({
    url: '/pessoas/' + encodeURIComponent(id),
    type: 'DELETE',
    success: function () {
      $item.remove();
    },
  })
})