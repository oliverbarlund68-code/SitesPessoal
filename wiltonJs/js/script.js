document.getElementById("btnplay").addEventListener("click", play);
document.getElementById("btnPausa").addEventListener("click", pause);
let cronometro1;

function play() {
    //setTimeout(exibirmsg, 1000); //Chama a função uma vez
   cronometro1 = setInterval(exibirmsg, 1000); //Chama a função infinitamente
}
function pause() {
    clearInterval(cronometro1)
}
function exibirmsg() {
    document.getElementById("nroAleatorio").innerHTML =
    parseInt(Math.random()*10);
}