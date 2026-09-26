//usr1 = {usuario:"Oliver", senha:"123"}
var nome = document.getElementById("nome");
var senha = document.getElementById("senha");
var btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", function() {
    localStorage.setItem("usuario", nome.value);
    localStorage.setItem("senha", senha.value);
});