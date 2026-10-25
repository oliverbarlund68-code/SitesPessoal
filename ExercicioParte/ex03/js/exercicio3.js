document.getElementById("btnIniciar").addEventListener("click", function() {
    const nome = document.getElementById("inputNome").value;
    if (!nome.trim()) return;

    const divResultado = document.getElementById("resultado");
    divResultado.textContent = nome;

    let tamanho = 14; // Tamanho inicial
    divResultado.style.fontSize = tamanho + "px";

    // Incrementa de 2 em 2 px a cada 0.5s (500ms)
    const intervalo = setInterval(function() {
        tamanho += 2;
        divResultado.style.fontSize = tamanho + "px";

        if (tamanho >= 40) {
            clearInterval(intervalo);
        }
    }, 500);
});