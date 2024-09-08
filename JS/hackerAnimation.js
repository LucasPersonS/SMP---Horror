document.addEventListener('DOMContentLoaded', () => {
    const codeArea = document.getElementById('code-area');
    const downloadButton = document.getElementById('download-button');
    const anotherDownloadButton = document.getElementById('another-download-button');
    const extraDownloadButton = document.getElementById('extra-download-button');
    const extraDownloadButton2 = document.getElementById('extra-download-button-2');
    const extraDownloadButton3 = document.getElementById('extra-download-button-3');
    const extraDownloadButton4 = document.getElementById('extra-download-button-4');
    const extraDownloadButton5 = document.getElementById('extra-download-button-5');
    const extraDownloadButton6 = document.getElementById('extra-download-button-6');
    const userCodeInput = document.getElementById('user-code');

    userCodeInput.style.display = 'none';
    downloadButton.style.display = 'none';
    anotherDownloadButton.style.display = 'none';
    extraDownloadButton.style.display = 'none';
    extraDownloadButton2.style.display = 'none';
    extraDownloadButton3.style.display = 'none';
    extraDownloadButton4.style.display = 'none';
    extraDownloadButton5.style.display = 'none';
    extraDownloadButton6.style.display = 'none';

    let isAuthenticated = false; // Variável para verificar autenticação
    let isAwaitingPassword = false; // Variável para verificar se estamos esperando a senha

    let passwordInputListener;

    function displayMessagesAndButtons() {
        setTimeout(() => {
            codeArea.innerHTML += '<p class="highlight">Conectando ao Banco de dados NKLY...</p>';
            codeArea.scrollTop = codeArea.scrollHeight;
        }, 500);

        setTimeout(() => {
            codeArea.innerHTML += '<p class="highlight-waiting">Esperando...</p>';
            codeArea.scrollTop = codeArea.scrollHeight;
        }, 1500);

        setTimeout(() => {
            typeText('Insira suas informações:\nUsuário: Nikolay ', 50);
        }, 4500);

        setTimeout(() => {
            codeArea.innerHTML += '\nPassword: <span id="password-display" style="color: #00ff00"></span>';
        }, 7500);

        setTimeout(() => {
            isAwaitingPassword = true; // Agora estamos esperando a senha
            userCodeInput.style.display = 'inline-block';

            // Adiciona o listener para o campo de entrada da senha e guarda o reference
            passwordInputListener = (event) => {
                const passwordDisplay = document.getElementById('password-display');
                passwordDisplay.textContent = event.target.value; // Display the password in real-time
            };
            userCodeInput.addEventListener('input', passwordInputListener);
        }, 7500);  
    }

    function typeText(text, speed) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                codeArea.innerHTML += text.charAt(i);
                codeArea.scrollTop = codeArea.scrollHeight;
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }

    displayMessagesAndButtons();

    window.submitCode = function() {
        const userCode = document.getElementById('user-code').value.trim();
        const passwordDisplay = document.getElementById('password-display');
        const codeArea = document.getElementById('code-area');
        const response = document.createElement('p');
        response.className = 'user-feedback';

        downloadButton.style.display = 'none';
        anotherDownloadButton.style.display = 'none';
        extraDownloadButton.style.display = 'none';
        extraDownloadButton2.style.display = 'none';
        extraDownloadButton3.style.display = 'none';
        extraDownloadButton4.style.display = 'none';
        extraDownloadButton5.style.display = 'none';
        extraDownloadButton6.style.display = 'none';

        if (userCode === '') {
            response.textContent = '> Por favor, insira um código.';
            response.style.color = '#ff0000';
            codeArea.appendChild(response);
            return;
        }

        if (isAwaitingPassword) {
            codeArea.innerHTML += '<p class="highlight">Validando informações...</p>';
            codeArea.scrollTop = codeArea.scrollHeight;

            setTimeout(() => {
                if (userCode === 'Verdante@2015') {
                    isAuthenticated = true;
                    isAwaitingPassword = false;
                    codeArea.innerHTML += '<p class="highlight-waiting">Usuário conectado!!</p>\n\n';
                    codeArea.scrollTop = codeArea.scrollHeight;
                    codeArea.innerHTML += '<p class="highlight-waiting">Digite "manual" para receber uma instrução da máquina</p>\n\n';
                    userCodeInput.removeEventListener('input', passwordInputListener); // Remove o event listener
                } else {
                    response.textContent = '> Senha incorreta. Tente novamente.';
                    response.style.color = '#ff0000';
                    codeArea.appendChild(response);
                }
                // Reset the password display after validation
                passwordDisplay.textContent = '';
            }, 2000); // Simula tempo de validação
        } else if (isAuthenticated) {
            if (isValidCode(userCode)) {
                RespostaChat(userCode);
            } else {
                response.textContent = `> Código inserido: ${userCode}\n> Código inválido. Tente novamente.`;
                response.style.color = '#ff0000';
                codeArea.appendChild(response);
            }
        } else {
            response.textContent = '> Você precisa se autenticar antes de continuar.';
            response.style.color = '#ff0000';
            codeArea.appendChild(response);
        }

        codeArea.scrollTop = codeArea.scrollHeight;
    }

    function isValidCode(code) {
        const validCodes = [
            'manual', 'Astaroth:imagem', 'Audio:01', 'Audio:02', 
            'Audio:03', 'Audio:04', 'Audio:05', 'Nikolay:trabalho', 'Nikolay:idade', 'Nikolay:contato', 'ORIS'
        ]; 
        return validCodes.includes(code);
    }

    function RespostaChat(code) {
        const response = document.createElement('p');
        response.className = 'user-feedback';
        if (code === 'Nikolay:trabalho') {
            response.textContent = `> Nikolay é um investigador paranormal freelancer.`;
            response.style.color = '#00ff00'; 
        } 
        else if (code === 'Nikolay:idade') {
            response.textContent = `> Nikolay deveria ter 35 anos, em 2024.`;
            response.style.color = '#00ff00'; 
        }
        else if (code === 'Nikolay:contato') {
            response.textContent = `> Você pode me contatar para serviços, via Gmail! "nikolayverdante@gmail.com"`;
            response.style.color = '#00ff00';
        }
        else if (code === 'yurukari') {
            response.textContent = `> ERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERROERRO`;
            response.style.color = '#ff0000';
        }
        else {
            response.textContent = `> Código inserido: ${code}\n> Código aceito. Aguarde...`;
            response.style.color = '#00ff00'; 
            createDownloadButtons(code); // Chama a função de exibição dos botões de download
        }
       
        codeArea.appendChild(response);
    }

    function downloadDocument() {
        const link = document.createElement('a');
        link.href = './documentos/arquivo.pdf'; 
        link.download = 'arquivo.pdf';
        link.click();
    }
    function createDownloadButtons(code) {
        if (code === 'manual') {
            extraDownloadButton.style.display = 'inline-block';
            extraDownloadButton.onclick = () => downloadExtraDocument(code);
        }
        if (code === 'Astaroth:imagem') {
            anotherDownloadButton.style.display = 'inline-block';
            anotherDownloadButton.onclick = () => downloadAnotherDocument(code);
        }
        if (code === 'ORIS') {
            document.getElementById('oris-download-button').style.display = 'inline-block';
            document.getElementById('oris-download-button').onclick = () => downloadOrisImage(code);
        }
        if (code === 'Audio:01') {
            extraDownloadButton2.style.display = 'inline-block';
            extraDownloadButton2.onclick = () => downloadExtraDocument2(code);
        }
        if (code === 'Audio:02') {
            extraDownloadButton3.style.display = 'inline-block';
            extraDownloadButton3.onclick = () => downloadExtraDocument3(code);
        }
        if (code === 'Audio:03') {
            extraDownloadButton4.style.display = 'inline-block';
            extraDownloadButton4.onclick = () => downloadExtraDocument4(code);
        }
        if (code === 'Audio:04') {
            extraDownloadButton5.style.display = 'inline-block';
            extraDownloadButton5.onclick = () => downloadExtraDocument5(code);
        }
        if (code === 'Audio:05') {
            extraDownloadButton6.style.display = 'inline-block';
            extraDownloadButton6.onclick = () => downloadExtraDocument6(code);
        }
    }
    function downloadExtraDocument2(code) {
        const link = document.createElement('a');
        link.href = './documentos/audio01.mp3';
        link.download = 'audio01.mp3';
        link.click();
    }

    function downloadExtraDocument3(code) {
        const link = document.createElement('a');
        link.href = './documentos/fita02.mp4';
        link.download = 'audio02.mp3';
        link.click();
    }

    function downloadExtraDocument(code) {
        const link = document.createElement('a');
        link.href = './documentos/manual.pdf';
        link.download = 'manual.pdf';
        link.click();
    }

    function downloadAnotherDocument(code) {
        const link = document.createElement('a');
        link.href = './documentos/astaroth.png';
        link.download = 'astaroth.png';
        link.click();
    }

    function downloadOrisImage(code) {
        const link = document.createElement('a');
        link.href = './documentos/oris.png'; 
        link.download = 'oris.png';
        link.click();
    }
    
});
