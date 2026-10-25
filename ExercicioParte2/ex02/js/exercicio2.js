document.getElementById("btnTransferir").addEventListener("click", function() {
    const caixa1 = document.getElementById("caixa1");
    const caixa2 = document.getElementById("caixa2");
    const segundos = parseInt(document.getElementById("tempoSegundos").value);

    // Converte os segundos selecionados para milissegundos
    setTimeout(function() {
        caixa2.value = caixa1.value;
        caixa1.value = "";
    }, segundos * 1000);
});