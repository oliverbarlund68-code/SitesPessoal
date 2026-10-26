const temperatura = 25;
if(temperatura >= 25) {
   console.log("Está Calor Hoje");
} else if (temperatura >= 18){
   console.log("Está Frio");
} else {
    console.log("Está com temperatura Normal");
}
switch(temperatura) {
   case "calor":
      console.log("Agradavel");
   break;
   case "Frio":
      console.log("Está Frio");
   break;
   case "Temperatura Normal":
      console.log("Está Com Temperatura Normal");
   break;
   default:
}
const numeroParImpar = 8;
const classificado = (numeroParImpar % 2 === 0) ? "par" : "impar";
console.log(classificado);

function maiorNumero(a, b) {
   if(a > b) {
      return a;
   } else {
      return b;
   }
}
console.log(maiorNumero(10, 7));
console.log(maiorNumero(4, 9));

const somarDoisNumeros = (a, b) => a + b;
console.log(somarDoisNumeros(3, 6));

function calcularDesconto(preco, percetual) {
   return preco - (preco * percetual / 100);
}
console.log(calcularDesconto(100, 15));

// 1. Criar uma lista com 5 comidas
const comidas = ['Pizza', 'Hambúrguer', 'Arroz', 'Sushi', 'Lasanha'];

// 2. Mostrar a primeira e a última comida
const primeiraComida = comidas[0];
const ultimaComida = comidas[comidas.length - 1];
console.log('Primeira comida:', primeiraComida); // Saída: Pizza
console.log('Última comida:', ultimaComida);     // Saída: Lasanha

// 3. Adicionar uma comida (no final da lista)
comidas.push('Taco');
console.log('Após adicionar:', comidas); 
// Saída: ['Pizza', 'Hambúrguer', 'Arroz', 'Sushi', 'Lasanha', 'Taco']

// 4. Remover a última comida
comidas.pop();
console.log('Após remover a última:', comidas); 
// Saída: ['Pizza', 'Hambúrguer', 'Arroz', 'Sushi', 'Lasanha']

// 5. Filtrar palavras com exatamente 5 caracteres
const comidasComCincoLetras = comidas.filter(comida => comida.length === 5);
console.log('Comidas com 5 letras:', comidasComCincoLetras); 
// Saída: ['Pizza', 'Arroz', 'Sushi']
let frutas = ["maça", "banana", "uva"];
console.log(frutas);
console.log(frutas[2]);
console.log(frutas[1]);
console.log(frutas.length);
//Forma Altenativa
frutas[1] = "uva";

console.log(frutas);

// 1. Criar o objeto aluno
const aluno = {
  nome: "Ana",
  idade: 20,
  curso: "Engenharia de Software"
};

// 2. Exibir nome e idade no console
console.log("Nome: " + aluno.nome);
console.log("Idade: " + aluno.idade);

// 3. Alterar o curso
aluno.curso = "Ciência da Computação";

// Verificar o objeto atualizado
console.log("Novo curso: " + aluno.curso);
console.log(aluno);

const campoTarefa = document.querySelector("#tarefa");
const botaoAdicionar = document.querySelector("#.adicionar");

const tarefas = [];
function atualizarContador() {
      campoTarefa.textContent = "Tarefas cadastradas: " + tarefas.length;
}
function adicionarTarefa() {
   const texto = campoTarefa.value.trim();
   if (texto === "") {
      window.alert("Digite uma tarefa antes de adicionar");
      return;
   }
   const tarefa = {
      texto: texto,
      concluida: false
   };
   tarefa.push(tarefa);
   const item = document.createElement("li");
   item.textContent = tarefa.texto + " ";
   const botaoRemover = document.createElement("button");
   botaoRemover.textContent = "X";
}
function removerTarefa() {
   const indice = tafera.indexOf(tarefas);
   if (indice !== -1) {
      tarefas.splice(indice, 1);
   }
   item.remove();
   atualizarContador();
}