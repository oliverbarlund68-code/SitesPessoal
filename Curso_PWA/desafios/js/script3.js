// ===================================
// 1. RECUPERAR OS ELEMENTOS DO HTML
// ===================================

const formulario = document.getElementById("formProduto");

const nome = document.getElementById("nome");
const preco = document.getElementById("preco");
const categoria = document.getElementById("categoria");
const descricao = document.getElementById("descricao");

const listaProdutos = document.getElementById("listaProdutos");

const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtro");

const totalProdutos = document.getElementById("totalProdutos");
const valorTotal = document.getElementById("valorTotal");

// ===================================
// 2. RECUPERAR OS DADOS DO LOCALSTORAGE
// ===================================

// Busca os dados salvos no navegador.

let produtos = [];

try {
     // Código que tentaremos executar
    const dadosSalvos = localStorage.getItem("meuAchadinho");

    produtos = dadosSalvos ? JSON.parse(dadosSalvos) : []; //"maria"

    if (!Array.isArray(produtos)) { // verifica se determinado valor é um array.
        produtos = [];
    }

} catch (erro) { // caso: [{"nome": "Fone", "preco": }] -> inválido
    produtos = [];
}

// ===================================
// 3. SALVAR OS DADOS
// ===================================

function salvarDados() {

    // Transforma o array em uma string JSON.

    const dados = JSON.stringify(produtos);

    // Salva os dados no LocalStorage.

    localStorage.setItem("meuAchadinho", dados);
}
// ===================================
// 4. CADASTRAR UM PRODUTO
// ===================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Criando um objeto com os dados do formulário.

    const produto = {

        id: Date.now(),

        nome: nome.value.trim(),

        preco: Number(preco.value),

        categoria: categoria.value,

        descricao: descricao.value.trim(),

        comprado: false
    };

    // Adicionando o objeto ao array.

    produtos.push(produto);

    // Salvando no LocalStorage.

    salvarDados();

    // Atualizando a tela.

    mostrarProdutos();

    // Limpando o formulário.

    formulario.reset();

});

// ===================================
// 5. EXIBIR OS PRODUTOS NA TELA
// ===================================

function mostrarProdutos() {

    // Limpa a lista antes de criar os cards novamente.

    listaProdutos.innerHTML = "";

    // Atualiza as estatísticas.

    atualizarEstatisticas();

    // Recupera o texto pesquisado.

    const textoPesquisa = pesquisa.value.toLowerCase(); // transforma todas as letras de um texto em letras minúsculas.

    // Recupera o filtro selecionado.

    const tipoFiltro = filtro.value;


    // Filtra os produtos.

    const produtosFiltrados = produtos.filter(function(produto) {
        // Verifica se o nome do produto corresponde ao que o usuário pesquisou.
        const correspondePesquisa = produto.nome

            .toLowerCase() 
            // Transforma o nome do produto em letras minúsculas.

            .includes(textoPesquisa);
            // Verifica se o nome do produto contém o texto pesquisado.
            // Retorna true se encontrar e false se não encontrar.


        // Verifica se o produto corresponde ao filtro selecionado pelo usuário.
        const correspondeFiltro =

            tipoFiltro === "todos" ||
            // Se o usuário selecionou "todos", aceita qualquer produto.

            (tipoFiltro === "pendentes" && !produto.comprado) ||
            // Se selecionou "pendentes", verifica se o produto ainda NÃO foi comprado.
            // O ! significa negação.

            (tipoFiltro === "comprados" && produto.comprado);
            // Se selecionou "comprados", verifica se o produto já foi comprado.


        // Retorna o resultado final da filtragem.
        return correspondePesquisa && correspondeFiltro;

        // O produto só será exibido se corresponder à pesquisa
        // E também atender ao filtro selecionado.
        // O && significa E: as duas condições precisam ser verdadeiras.

    });


    // Verifica se existem produtos para exibir.

    if (produtosFiltrados.length === 0) {

        const mensagem = document.createElement("p");

        mensagem.classList.add("vazio");

        mensagem.textContent = "Nenhum produto encontrado.";

        listaProdutos.appendChild(mensagem);

        return;
    }


    // Percorre os produtos filtrados.

    produtosFiltrados.forEach(function(produto) {

        // Criando o card.

        const card = document.createElement("div");

        card.classList.add("produto");


        // Criando o título.

        const titulo = document.createElement("h3");

        titulo.textContent = produto.nome;


        // Criando o preço.

        const precoProduto = document.createElement("p");

        precoProduto.textContent =
            "Preço: " + produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });


        // Criando a categoria.

        const categoriaProduto = document.createElement("p");

        categoriaProduto.textContent =
            "Categoria: " + produto.categoria;


        // Criando a descrição.

        const descricaoProduto = document.createElement("p");

        descricaoProduto.textContent =
            "Descrição: " + (produto.descricao || "Não informada");


        // Criando o status.

        const status = document.createElement("p");

        if (produto.comprado) {

            status.textContent = "Status: Já comprei!";

            status.classList.add("comprado");

        } else {

            status.textContent = "Status: Desejo de compra";

            status.classList.add("pendente");

        }


        // Criando botão de status.

        const botaoStatus = document.createElement("button");

        botaoStatus.classList.add("btn-status");

        botaoStatus.textContent = produto.comprado
            ? "Marcar como não comprado"
            : "Marcar como comprado";


        // Criando botão de excluir.

        const botaoExcluir = document.createElement("button");

        botaoExcluir.classList.add("btn-excluir");

        botaoExcluir.textContent = "Excluir produto";


        // Adicionando os elementos ao card.

        card.appendChild(titulo);

        card.appendChild(precoProduto);

        card.appendChild(categoriaProduto);

        card.appendChild(descricaoProduto);

        card.appendChild(status);

        card.appendChild(botaoStatus);

        card.appendChild(botaoExcluir);


        // Adicionando o card à página.

        listaProdutos.appendChild(card);


        // ===================================
        // EVENTO: ALTERAR STATUS
        // ===================================

        botaoStatus.addEventListener("click", function() {

            produto.comprado = !produto.comprado;

            salvarDados();

            mostrarProdutos();

        });


        // ===================================
        // EVENTO: EXCLUIR PRODUTO
        // ===================================

        botaoExcluir.addEventListener("click", function() {

            produtos = produtos.filter(function(item) {

                return item.id !== produto.id;

            });

            salvarDados();

            mostrarProdutos();

        });

    });

}


// ===================================
// 6. PESQUISAR PRODUTOS
// ===================================

pesquisa.addEventListener("input", function() {

    mostrarProdutos();

});


// ===================================
// 7. FILTRAR PRODUTOS
// ===================================

filtro.addEventListener("change", function() { //CHANGE -> Quando o valor de um campo é alterado

    mostrarProdutos();

});


// ===================================
// 8. ATUALIZAR ESTATÍSTICAS
// ===================================

function atualizarEstatisticas() {

    // Quantidade de produtos cadastrados.

    totalProdutos.textContent = produtos.length;


    // Somando os preços de todos os produtos.

    let soma = 0;

    produtos.forEach(function(produto) {

        soma += produto.preco;

    });


    // Exibindo o valor total.

    valorTotal.textContent = soma.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

// ===================================
// 9. INICIALIZAR A APLICAÇÃO
// ===================================

// Exibe os produtos salvos ao abrir a página.

mostrarProdutos();
// ===================================
// 10. NAVEGAÇÃO DE ABAS
// ===================================

function mudarAba(event, idAba) {
    // 1. Esconde todo o conteúdo das abas
    const conteudos = document.querySelectorAll(".tab-content");
    conteudos.forEach(function(conteudo) {
        conteudo.classList.remove("ativa");
    });

    // 2. Remove o destaque ativo de todos os botões da barra lateral
    const botoes = document.querySelectorAll(".tab-btn");
    botoes.forEach(function(botao) {
        botao.classList.remove("ativa");
    });

    // 3. Exibe o painel selecionado
    document.getElementById(idAba).classList.add("ativa");

    // 4. Destaca o botão selecionado na sidebar
    event.currentTarget.classList.add("ativa");
}