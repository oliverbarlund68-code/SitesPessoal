document.getElementById("btnCadastrar").addEventListener("Click", function() {
    txtUsuario = document.getElementById("txtUsuario");
    txtSenha = document.getElementById("txtSenha");

    user = {usuario: txtUsuario.value, senha: txtSenha.value};
    localStorage.setItem("User", JSON.stringify(user));
})