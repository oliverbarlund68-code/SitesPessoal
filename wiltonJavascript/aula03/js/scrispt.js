function validarAcesso() {
    let login = document.getElementById("login").value;
    let senha = document.getElementById("senha").value;
    let confirmaSenha = document.getElementById("confirmaSenha").value;

    // Validação a: Verifica se o login está preenchido
    if (login.trim() === "") {
        alert("Por favor, informe o Login!");
        return;
    }

    // Validação b: Verifica se os campos de senha coincidem
    if (senha !== confirmaSenha) {
        alert("Erro: As senhas digitadas não coincidem!");
        document.getElementById("senha").value = "";
        document.getElementById("confirmaSenha").value = "";
    } else if (senha === "") {
        alert("Por favor, digite uma senha!");
    } else {
        alert("Todos os campos foram preenchidos corretamente!");
    }
}

function limparCampos() {
    document.getElementById("login").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("confirmaSenha").value = "";
}