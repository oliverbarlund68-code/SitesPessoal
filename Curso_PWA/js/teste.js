const inputTarefa = document.querySelector("#inputTarefa");
const campoContador = document.querySelector("#contador");
const botaoAdicionar = document.querySelector(".adicionar");
const listaTarefas = document.querySelector("#listaTarefas");

const tarefas = [];

function atualizarContador() {
    campoContador.textContent = "Tarefas cadastradas: " + tarefas.length;
}

function adicionarTarefa() {
    const texto = inputTarefa.value.trim();
    
    if (texto === "") {
        window.alert("Digite uma tarefa antes de adicionar");
        return;
    }

    const novaTarefa = {
        texto: texto,
        concluida: false
    };

    tarefas.push(novaTarefa);

    // Criação dos elementos visuais
    const item = document.createElement("li");
    item.textContent = novaTarefa.texto + " ";

    const botaoRemoverItem = document.createElement("button");
    botaoRemoverItem.textContent = "Remover";

    // Evento para remover este item específico
    botaoRemoverItem.addEventListener("click", function() {
        // Remove do array
        const indice = tarefas.indexOf(novaTarefa);
        if (indice !== -1) {
            tarefas.splice(indice, 1);
        }
        // Remove do HTML
        item.remove();
        atualizarContador();
    });

    item.appendChild(botaoRemoverItem);
    listaTarefas.appendChild(item);

    // Limpa o input e foca novamente nele
    inputTarefa.value = "";
    inputTarefa.focus();
    
    atualizarContador();
}

// Vincula o evento de clique ao botão de adicionar
botaoAdicionar.addEventListener("click", adicionarTarefa);

// Opcional: Adicionar pressionando a tecla "Enter"
inputTarefa.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        adicionarTarefa();
    }
});