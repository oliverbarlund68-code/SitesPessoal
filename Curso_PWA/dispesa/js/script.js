// Seleção de Elementos DOM
const form = document.getElementById('form-despesa');
const produtoInput = document.getElementById('produto');
const categoriaSelect = document.getElementById('categoria');
const valorInput = document.getElementById('valor');
const listaItens = document.getElementById('lista-itens');
const valorTotalEl = document.getElementById('valor-total');

// Recupera dados do localStorage ou inicia com array vazio
let itens = JSON.parse(localStorage.getItem('itensDespesa')) || [];

// Função para formatar moeda (R$)
function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Atualiza a interface e recalcula o total
function updateUI() {
  listaItens.innerHTML = '';
  let total = 0;

  if (itens.length === 0) {
    listaItens.innerHTML = `
      <li style="justify-content: center; color: #7f8c8d;">
        Nenhum item adicionado ainda.
      </li>
    `;
  } else {
    itens.forEach((item, index) => {
      total += item.valor;

      const li = document.createElement('li');
      li.innerHTML = `
        <div class="item-info">
          <strong>${item.produto}</strong>
          <span class="item-categoria">${item.categoria}</span>
        </div>
        <div>
          <strong style="margin-right: 10px;">${formatCurrency(item.valor)}</strong>
          <button class="btn-remover" onclick="removerItem(${index})" title="Remover">X</button>
        </div>
      `;
      listaItens.appendChild(li);
    });
  }

  valorTotalEl.textContent = formatCurrency(total);
  localStorage.setItem('itensDespesa', JSON.stringify(itens));
}

// Evento de envio do formulário
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const produto = produtoInput.value.trim();
  const categoria = categoriaSelect.value;
  const valor = parseFloat(valorInput.value);

  if (produto === '' || categoria === '' || isNaN(valor) || valor < 0) {
    return;
  }

  const novoItem = {
    produto,
    categoria,
    valor
  };

  itens.push(novoItem);
  updateUI();

  form.reset();
  produtoInput.focus();
});

// Função para remover item por índice
function removerItem(index) {
  itens.splice(index, 1);
  updateUI();
}

// Inicializa a aplicação
updateUI();