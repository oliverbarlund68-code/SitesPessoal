document.getElementById("btnExibir").addEventListener("click", function() {
    const entrada = document.getElementById("inputNomes").value;
    const container = document.getElementById("listaNomes");

    container.innerHTML = ""; // Limpa exibição anterior

    // Armazena os nomes em um vetor
    const vetorNomes = entrada.split(",").map(nome => nome.trim()).filter(nome => nome.length > 0);

    if (vetorNomes.length === 0) {
        alert("Digite ao menos um nome!");
        return;
    }

    let indice = 0;

    // Exibe um nome a cada 1 segundo (1000ms)
    const intervalo = setInterval(function() {
        if (indice < vetorNomes.length) {
            const p = document.createElement("p");
            p.textContent = vetorNomes[indice];
            container.appendChild(p);
            indice++;
        } else {
            clearInterval(intervalo);
        }
    }, 1000);
});