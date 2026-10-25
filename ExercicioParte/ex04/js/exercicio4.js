document.getElementById("btnIniciar").addEventListener("click", function() {
    let segundos = parseInt(document.getElementById("inputSegundos").value);
    const mensagem = document.getElementById("mensagem");

    if (isNaN(segundos) || segundos <= 0) {
        alert("Por favor, insira um número de segundos válido!");
        return;
    }

    mensagem.textContent = `Por favor, aguarde ${segundos} segundos para carregar a página do Google.`;

    const contador = setInterval(function() {
        segundos--;
        
        if (segundos > 0) {
            mensagem.textContent = `Por favor, aguarde ${segundos} segundos para carregar a página do Google.`;
        } else {
            mensagem.textContent = `Por favor, aguarde 0 segundos para carregar a página do Google.`;
            clearInterval(contador);
            window.location.href = "https://www.google.com";
        }
    }, 1000);
});