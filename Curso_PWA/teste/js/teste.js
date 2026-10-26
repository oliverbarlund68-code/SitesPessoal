function darBoasVindas() {
    window.alert("Bem Vindo");
}
const teste = "Desenvolvedor Oliver";
console.log(teste);

function capturarValor() {
  // 1. Seleciona o input pelo ID
  const input = document.getElementById("meuInput");
  
  // 2. Acessa a propriedade .value para pegar o texto digitado
  const valorDigitado = input.value;
  
  console.log(valorDigitado);
  alert("Você digitou: " + valorDigitado);
}
function salvarProduto() {
  // 1. Captura o texto do primeiro input
  const nomeProduto = document.getElementById("produto").value;
  
  // 2. Captura o valor do preço e converte para número decimal
  const precoInput = document.getElementById("preco").value;
  const precoNumero = parseFloat(precoInput);

  // 3. Validação simples para garantir que o usuário preencheu os campos
  if (nomeProduto === "" || isNaN(precoNumero)) {
    alert("Por favor, preencha todos os campos corretamente!");
    return;
  }

  // Exibindo os resultados no console
  console.log("Produto:", nomeProduto);
  console.log("Preço (como número):", precoNumero);
  
  // Exemplo de uso: calculando o preço com 10% de desconto
  const precoComDesconto = precoNumero * 0.9;
  alert(`Produto: ${nomeProduto}\nPreço com 10% de desconto: R$ ${precoComDesconto.toFixed(2)}`);
}