// =======================================================
// 1. ESTRUTURAS CONDICIONAIS
// =======================================================

console.log("\n========== 1. CONDICIONAIS ==========");

// 1.1 if e else
console.log("\n--- if e else ---");
const idade = 11;

if (idade >= 18) //false
{
  console.log("Maior de idade");
} 
else 
{
  console.log("Menor de idade");
}
// Resultado: Maior de idade

// 1.2 if, else if e else
console.log("\n--- if, else if e else ---");
const nota = 7.5;

if (nota >= 9) //false
{
  console.log("Excelente");
} 
else if (nota >= 7) //true
{
  console.log("Aprovado");
} 
else if (nota >= 5) {
  console.log("Recuperação");
} 
else 
{
  console.log("Reprovado");
}
// Resultado: Aprovado
// As condições são verificadas de cima para baixo.
// O primeiro bloco verdadeiro é executado.

// 1.3 switch
console.log("\n--- switch ---");
const opcao = 3;

switch (opcao) {
  case 1:
    console.log("Início");
    break;
  case 2:
    console.log("Perfil");
    break;
  case 3:
    console.log("Sair");
    break;
  default:
    console.log("Opção inválida");
}
// Resultado: Perfil
// break encerra o switch. default trata opções não previstas.

// 1.4 Operador ternário
console.log("\n--- operador ternário ---");
const idadeParaEntrada = 20;
const mensagem = idadeParaEntrada >= 18
  ? "Pode entrar"
  : "Entrada não permitida";

console.log(mensagem);

// Resultado: Pode entrar
// Forma: condição ? resultadoSeVerdadeira : resultadoSeFalsa

// =======================================================
// 2. ESTRUTURAS DE REPETIÇÃO
// =======================================================
/*
console.log("\n========== 2. REPETIÇÃO ==========");

// 2.1 for
console.log("\n--- for: contar de 1 a 5 ---");
for (let i = 1; i <= 5; i++) {
  console.log("Número:", i);
}
// let i = 1: inicialização
// i <= 5: condição para continuar
// i++: aumenta i em 1 a cada volta

// 2.2 while
console.log("\n--- while: contar de 1 a 3 ---");
let contador = 1;

while (contador <= 3) {
  console.log("Contador:", contador);
  contador++;
}
// while verifica a condição antes de executar.
// É importante atualizar o contador para evitar loop infinito.

// 2.3 do...while
console.log("\n--- do...while ---");
let tentativa = 1;

do {
  console.log("Tentativa:", tentativa);
  tentativa++;
} while (tentativa <= 3);
// do...while executa o bloco pelo menos uma vez,
// porque verifica a condição somente depois do bloco.
*/
// =======================================================
// 3. FUNÇÕES
// =======================================================
/*
console.log("\n========== 3. FUNÇÕES ==========");

// 3.1 Declaração de função
console.log("\n--- declaração de função ---");

function saudar(nome) {
  return "Olá, " + nome + "!";
}

console.log(saudar("Ana"));
// nome é o parâmetro; "Ana" é o argumento.
// return devolve um valor para quem chamou a função.

// 3.2 Expressão de função
console.log("\n--- expressão de função ---");
const dobrar = function (numero) {
  return numero * 2;
};

console.log(dobrar(4));
// Resultado: 8
// A função foi armazenada na variável dobrar.

// 3.3 Arrow function
console.log("\n--- arrow function ---");
const somar = (a, b) => {
  return a + b;
};

const quadrado = numero => numero * numero;

console.log(somar(2, 3));   // Resultado: 5
console.log(quadrado(4));   // Resultado: 16
// Arrow function usa =>.
// Quando há uma única expressão sem chaves, o retorno é implícito.

// 3.4 Parâmetros, valores padrão e retorno
console.log("\n--- parâmetros e retorno ---");
function apresentar(nome = "pessoa") {
  return `Bem-vindo(a), ${nome}!`;
}

function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

console.log(apresentar("Carlos"));
console.log(apresentar()); // usa o valor padrão "pessoa"
console.log(calcularMedia(8, 10)); // Resultado: 9

function mostrarMensagem() {
  console.log("Esta função mostra uma mensagem.");
  // Não tem return explícito.
}

const resultadoMensagem = mostrarMensagem();
console.log("Retorno da função:", resultadoMensagem);
// Resultado do retorno: undefined
*/

// =======================================================
// 4. ESCOPO: GLOBAL, LOCAL E DE BLOCO
// =======================================================

/*
console.log("\n========== 4. ESCOPO ==========");

// 4.1 Escopo global
const nomeSistema = "Meu Mercado";

function mostrarSistema() {
  console.log("Sistema:", nomeSistema);
}

mostrarSistema();
// nomeSistema foi declarado fora da função e pode ser acessado aqui.

// 4.2 Escopo local (de função)
function exemploEscopoLocal() {
  const mensagemLocal = "Só existe dentro desta função";
  console.log(mensagemLocal);
}

exemploEscopoLocal();
// console.log(mensagemLocal);
// Se descomentar a linha acima, ocorrerá ReferenceError,
// pois mensagemLocal não existe fora da função.

// 4.3 Escopo de bloco: let e const
if (true) {
  let pontos = 10;
  const bonus = 2;
  console.log("Pontos dentro do bloco:", pontos);
  console.log("Bônus dentro do bloco:", bonus);
}

// console.log(pontos); // ReferenceError: fora do bloco
// console.log(bonus);  // ReferenceError: fora do bloco

// var tem escopo de função, não de bloco, em scripts tradicionais.
if (true) {
  var avisoVar = "var continua acessível neste escopo";
}
console.log(avisoVar);

// Regra prática: prefira const quando não for reatribuir
// e let quando precisar alterar o valor. Evite var no início.
*/

// =======================================================
// 5. RESOLUÇÕES DOS EXERCÍCIOS DO ROTEIRO
// =======================================================


console.log("\n========== 5. RESOLUÇÕES DOS EXERCÍCIOS ==========");

// Exercício 1 — Classificar temperatura
console.log("\n--- Exercício 1: temperatura ---");

const temperatura = 25;

if (temperatura < 18) {
  console.log("Frio");
} else if (temperatura <= 27) {
  console.log("Agradável");
} else {
  console.log("Quente");
}

// Resultado para 25: Agradável

// Exercício 2 — Menu usando switch
console.log("\n--- Exercício 2: menu ---");

const opcaoMenu = 2;
switch (opcaoMenu) 
{
  case 1:
    console.log("Início");
    break;
  case 2:
    console.log("Perfil");
    break;
  case 3:
    console.log("Sair");
    break;
  default:
    console.log("Opção inválida");
}
// Resultado para opção 2: Perfil
// Exercício 3 — Par ou ímpar usando ternário
//console.log("\n--- Exercício 3: par ou ímpar ---");
const numeroParImpar = 9;
const classificacao = (numeroParImpar % 2 === 0) ? "Par" : "Ímpar";
console.log(classificacao);
// % calcula o resto da divisão. Resto 0 significa par.


// Exercício 4 — for de 1 a 10
console.log("\n--- Exercício 4: números de 1 a 10 ---");
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// Exercício 5 — while somando de 1 a 5
console.log("\n--- Exercício 5: soma de 1 a 5 ---");
let numeroSoma = 1;
let soma = 0;

while (numeroSoma <= 5) {
  soma += numeroSoma;
  numeroSoma++;
}
console.log("Soma total:", soma);
// Resultado: 15

// Exercício 6 — do...while contando de 5 até 1
console.log("\n--- Exercício 6: contagem regressiva ---");
let contagem = 5;

do {
  console.log(contagem);
  contagem--; // contagem - 1 
} while (contagem >= 1);


// Exercício 7 — função que retorna o maior de dois números
console.log("\n--- Exercício 7: maior número ---");

function maiorNumero(a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}

console.log(maiorNumero(10, 7)); // Resultado: 10
console.log(maiorNumero(4, 9));  // Resultado: 9

// Exercício 8 — soma escrita como arrow function
console.log("\n--- Exercício 8: soma com arrow function ---");
const somarDoisNumeros = (a, b) => a + b;
console.log(somarDoisNumeros(3, 6)); // Resultado: 9

// Exercício 9 — calcular preço com desconto
console.log("\n--- Exercício 9: desconto ---");

function calcularDesconto(preco, percentual) {
  return preco - (preco * percentual / 100);
}

console.log(calcularDesconto(100, 15)); // Resultado: 85



// =======================================================
// 6. DESAFIO INTEGRADO — CALCULADORA DE NOTAS
// =======================================================

/*console.log("\n========== 6. DESAFIO INTEGRADO ==========");

function mediaDeTresNotas(n1, n2, n3) {
  return (n1 + n2 + n3) / 3;
}

const mediaFinal = mediaDeTresNotas(8, 6, 7);
console.log("Média:", mediaFinal.toFixed(1));

if (mediaFinal >= 7) {
  console.log("Aprovado");
} else if (mediaFinal >= 5) {
  console.log("Recuperação");
} else {
  console.log("Reprovado");
}

for (let repeticao = 1; repeticao <= 3; repeticao++) {
  console.log("Continue praticando!", repeticao);
}*/