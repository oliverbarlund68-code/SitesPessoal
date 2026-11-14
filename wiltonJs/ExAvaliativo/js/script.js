 function mudarEstilosInputs(tipoTag, tipoInput, valorRef, nomeClasse) {
            var nroCampos = document.getElementsByTagName(tipoTag).length;
            for (var i = 0; i < nroCampos; i++) {
                if (tipoInput == "button") {
                    if (document.getElementsByTagName(tipoTag)[i].type == tipoInput)
                        document.getElementsByTagName(tipoTag)[i].className = nomeClasse;
                } else if (document.getElementsByTagName(tipoTag)[i].value == valorRef)
                    document.getElementsByTagName(tipoTag)[i].className = nomeClasse;
            }
        }

        function inserirMascara(idCampo, mascara) {
            var tamanhoMascara = mascara.length;
            if (document.getElementById(idCampo).value.length > tamanhoMascara - 1)
                document.getElementById(idCampo).value = (document.getElementById(idCampo).value).substr(0, tamanhoMascara - 1);
            else {
                var i;
                var vetorPosicoes = new Array();
                var vetorSimbolos = new Array();
                var padrao = /[a-zA-Z0-9]/;

                for (i = 0; i < tamanhoMascara; i++) {
                    if (mascara.charAt(i).match(padrao) == null) {
                        vetorSimbolos.push(mascara.charAt(i));
                        vetorPosicoes.push(i + 1);
                    }
                }

                var tamanhoCampo = document.getElementById(idCampo).value.length;
                for (i = 0; i < vetorPosicoes.length; i++) {
                    if (tamanhoCampo < vetorPosicoes[i]) break;
                    else {
                        var texto = document.getElementById(idCampo).value;
                        if (texto[vetorPosicoes[i] - 1] != vetorSimbolos[i])
                            document.getElementById(idCampo).value = texto.slice(0, vetorPosicoes[i] - 1) + vetorSimbolos[i] + texto.slice(vetorPosicoes[i] - 1);
                    }
                }
            }
        }

        function validarInformacao(idCampo, expReg, classeUsuarioSucesso, classeUsuarioErro) {
            var valor = document.getElementById(idCampo).value;

            var estiloSucesso = '.classeGenericaErro { background-color:#FFF4F4; border:#FF6666 1px solid; padding:8px 10px;} ';
            var estiloErro = '.classeGenericaSucesso { background-color:#E2FFE1; color:#333333; border:green 1px solid; padding:8px 10px; }';

            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = estiloSucesso + estiloErro;
            document.getElementsByTagName('head')[0].appendChild(style);

            var valido = expReg.test(valor);

            if (valido) {
                if (classeUsuarioSucesso == "")
                    document.getElementById(idCampo).className = 'classeGenericaSucesso';
                else
                    document.getElementById(idCampo).className = classeUsuarioSucesso;
            } else if (classeUsuarioErro == "")
                document.getElementById(idCampo).className = 'classeGenericaErro';
            else
                document.getElementById(idCampo).className = classeUsuarioErro;

            return valido;
        }

        // Função auxiliar que integra a validação do jMaskWiFi e exibe o feedback textual ao lado
        function validarCampo(idCampo, idMsg, regex) {
            var ehValido = validarInformacao(idCampo, regex, 'campoSucesso', 'campoErro');
            var spanMsg = document.getElementById(idMsg);
            if (ehValido) {
                spanMsg.textContent = "✔ Válido";
                spanMsg.className = "status-msg valido";
            } else {
                spanMsg.textContent = "✖ Inválido";
                spanMsg.className = "status-msg invalido";
            }
        }