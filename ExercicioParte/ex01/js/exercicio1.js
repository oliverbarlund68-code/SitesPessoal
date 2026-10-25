document.getElementById("btnTransferir").addEventListener("click", function() {
    const caixa1 = document.getElementById("caixa1");
    const caixa2 = document.getElementById("caixa2");

    // Aguarda 2 segundos (2000 ms)
    setTimeout(function() {
        caixa2.value = caixa1.value;
        caixa1.value = "";
    }, 2000);
});