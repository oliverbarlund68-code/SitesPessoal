let quantidadeItens = 0;
let precoUnitario = 50.00;
let totalCarrinho = 0;

const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const addBtn = document.getElementById('add-btn');
const checkoutBtn = document.getElementById('checkout-btn');

addBtn.addEventListener('click', () => {
  quantidadeItens++;
  totalCarrinho += precoUnitario;

  cartCountElement.textContent = quantidadeItens;
  cartTotalElement.textContent = totalCarrinho.toFixed(2).replace('.', ',');
});

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
