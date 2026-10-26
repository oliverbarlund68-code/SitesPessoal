const produto = "Banana";
const preco = 25;
const quantidade = 4;

const total = preco * quantidade;
const desconto = total * 0.10;
const totalFinal = total - desconto;

console.log("Produto", produto);
console.log("Total Sem Desconto", total);
console.log("Total com Desconto", totalFinal);
console.log("Ficou abaixo de R$ 100?", totalFinal);

const opcaoMenu = 2;

switch(opcaoMenu) {
    case 1:
    console.log("Inicio");
    break;
    case 2:
    console.log("Perfil");
    break;
    case 3:
    console.log("Sair");
    break;
    default:
    console.log("Opção Invalida");
}
for(let i = 10; i <= 5; i++) {
    console.log(i);
}
let numeroSoma = 1;
let soma = 0;
while(numeroSoma >= 10) {
    soma +=  numeroSoma;
    numeroSoma++;
}
console.log("Contagem Regressiva");
let contagem = 5;

do {
    console.log(contagem);
    contagem--;
} while (contagem >= 1);

function maiorNumero(a, b) {
   if(a > b) {
      return a;
   } else {
      return b;
   }
}
console.log(maiorNumero(10, 7));
console.log(maiorNumero(4, 9));

const conta = soma => soma * 2;

function calcularDesconto(preco) {
    console.log("Seu Preço É: " + preco);
}
const resultadoMercado = calcularDesconto(20, 10);
console.log(resultadoMercado * 2);

let armazem = {
    nome: "Coca",
    preco: 12.40,
    disponivel: true
};

console.log(armazem.nome);
console.log(armazem.preco);

const botao = document.querySelector("#botao");
const resultado = document.querySelector("#resultado");

botao.addEventListener("click", () => {
    resultado.textContent = "Produto Cadastrado Obrigado";
});
const avalicao = document.querySelector("#avaliacao");
const avaliado = document.querySelector("#avaliado");

avalicao.addEventListener("click", () => {
    avaliado.textContent = "Obrigado pela avaliação"
});
const inputTarefa = document.getElementById('inputTarefa');
const botaoAdicionar = document.getElementById('botaoAdicionar');
const listaTarefas = document.getElementById('listaTarefas');

botaoAdicionar.addEventListener('click', function() {
  const textoTarefa = inputTarefa.value.trim();

  if (textoTarefa !== "") {
    // 1. Cria o elemento <li> da lista
    const novoItem = document.createElement('li');
    novoItem.textContent = textoTarefa + " "; // Espaço entre o texto e o botão
    novoItem.focus();

    // 2. Cria o botão de deletar
    const botaoDeletar = document.createElement('button');
    botaoDeletar.textContent = 'Remover'; // Você pode usar texto como "Excluir" se preferir
    botaoDeletar.style.marginLeft = '10px'; // Dá um espaçamento do texto

    // 3. Adiciona o evento para remover o item quando o botão for clicado
    botaoDeletar.addEventListener('click', function() {
      novoItem.remove(); // Remove o <li> correspondente da tela
    });

    // 4. Coloca o botão dentro do <li> e o <li> dentro do <ul>
    novoItem.appendChild(botaoDeletar);
    listaTarefas.appendChild(novoItem);

    // 5. Limpa o campo de texto
    inputTarefa.value = '';
    inputTarefa.focus();
  }
});
// Salvando um dado
localStorage.setItem("usuario", "João");

// Recuperando um dado
const usuarioSalvo = localStorage.getItem("usuario"); // Retorna "João"
const pessoa = { nome: "Ana", idade: 25 };
localStorage.setItem("pessoa", JSON.stringify(pessoa)); // Salva como string

const pessoaRecuperada = JSON.parse(localStorage.getItem("pessoa")); // Volta a ser objeto
sessionStorage.setItem("sessaoAtiva", "true");

function Bonito() {
    window.alert("Produto Registrado");
    console.log("Analise De Dados Do Dev");
}
const mercadoria = document.getElementById("produto").value;
document.getElementById("resultado").textContent = "Produto: Banana";

// Seleciona os elementos do HTML
const form = document.getElementById('formProduto');
const listaProdutos = document.getElementById('listaProdutos');

// Recupera produtos salvos anteriormente ou inicia um array vazio
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Função para renderizar os produtos na tela
function renderizarProdutos() {
  listaProdutos.innerHTML = '';
  
  produtos.forEach((produto, index) => {
    const item = document.createElement('div');
    item.classList.add('produto-card');
    item.innerHTML = `
      <h3>${produto.nome}</h3>
      <p>Preço: R$ ${produto.preco}</p>
      <p>Categoria: ${produto.categoria}</p>
      <button onclick="removerProduto(${index})">Remover</button>
    `;
    listaProdutos.appendChild(item);
  });
}

// Adiciona evento de submit ao formulário
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita recarregar a página

  // Coleta os valores dos inputs
  const nome = document.getElementById('nomeProduto').value;
  const preco = document.getElementById('precoProduto').value;
  const categoria = document.getElementById('categoriaProduto').value;

  // Cria o objeto do novo produto
  const novoProduto = {
    nome,
    preco,
    categoria
  };

  // Adiciona ao array
  produtos.push(novoProduto);

  // Salva no localStorage para não perder ao atualizar a página
  localStorage.setItem('produtos', JSON.stringify(produtos));

  // Atualiza a interface e limpa o formulário
  renderizarProdutos();
  form.reset();
});

// Função para remover produto
function removerProduto(index) {
  produtos.splice(index, 1);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  renderizarProdutos();
}

// Renderiza os produtos salvos assim que a página carregar
renderizarProdutos();