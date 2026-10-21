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
const NumeroEscolhido = 6;
for(const NumeroEscolhido = 10; NumeroEscolhido <= 5; NumeroEscolhido++) {
    console.log(NumeroEscolhido);
}
const Teste = 5;
while(Teste >= 10) {
    console.log("Numero Escolhido");
    Teste++;
}