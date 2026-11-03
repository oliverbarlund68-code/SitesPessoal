let quantidadeItens = 0;
let precoUnitario = 50.00; // Valor padrão ou inicial
let totalCarrinho = 0;

const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const addBtn = document.getElementById('add-btn');
const checkoutBtn = document.getElementById('checkout-btn');

// Botão de adicionar padrão (caso queira manter o botão antigo)
if (addBtn) {
  addBtn.addEventListener('click', () => {
    quantidadeItens++;
    totalCarrinho += precoUnitario;

    cartCountElement.textContent = quantidadeItens;
    cartTotalElement.textContent = totalCarrinho.toFixed(2).replace('.', ',');
  });
}

// Botão de finalizar compra
checkoutBtn.addEventListener('click', () => {
  if (quantidadeItens === 0) {
    alert('O seu carrinho está vazio!');
    return;
  }
  alert(`Compra finalizada! Total: R$ ${totalCarrinho.toFixed(2).replace('.', ',')}`);
  
  quantidadeItens = 0;
  totalCarrinho = 0;
  cartCountElement.textContent = quantidadeItens;
  cartTotalElement.textContent = '0,00';
});

// Manipulação do Formulário
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#meu-formulario");

    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault();

            let nome = document.querySelector("#nome").value;
            let precoReal = parseFloat(document.querySelector("#preco").value);

            // Validação de campos vazios ou preço inválido
            if (nome.trim() === "" || isNaN(precoReal) || precoReal <= 0) {
                console.log("Erro: Nome ou preço inválido.");
                alert("Por favor, preencha um nome válido e um preço maior que zero.");
                return; // Encerra aqui se houver erro
            }

            // Atualiza o preço unitário com o valor informado no formulário
            precoUnitario = precoReal;

            // Adiciona o item ao carrinho dinamicamente
            quantidadeItens++;
            totalCarrinho += precoUnitario;

            // Atualiza a interface do carrinho
            cartCountElement.textContent = quantidadeItens;
            cartTotalElement.textContent = totalCarrinho.toFixed(2).replace('.', ',');

            console.log("Produto adicionado: " + nome + " - R$ " + precoUnitario.toFixed(2));
            
            // Opcional: Limpar o formulário após adicionar
            formulario.reset();
        });
    }
});