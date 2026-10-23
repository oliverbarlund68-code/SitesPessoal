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

const produtos = {
    nome: "Coca",
    preco: 12.40,
    disponivel: true
};

console.log(produtos.nome);
console.log(produtos.preco);

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