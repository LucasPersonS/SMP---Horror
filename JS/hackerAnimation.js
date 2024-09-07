document.addEventListener('DOMContentLoaded', () => {
    const codeArea = document.getElementById('code-area');
    const mainMessage = document.getElementById('main-message');
    const downloadButton = document.getElementById('download-button');
    const anotherDownloadButton = document.getElementById('another-download-button');
    const extraDownloadButton = document.getElementById('extra-download-button');
    const extraDownloadButton2 = document.getElementById('extra-download-button-2');
    const extraDownloadButton3 = document.getElementById('extra-download-button-3');
    const extraDownloadButton4 = document.getElementById('extra-download-button-4');
    const extraDownloadButton5 = document.getElementById('extra-download-button-5');
    const extraDownloadButton6 = document.getElementById('extra-download-button-6');
    const userCodeInput = document.getElementById('user-code');
    
    // Inicialmente, esconder o campo de input e os botões
    userCodeInput.style.display = 'none';
    downloadButton.style.display = 'none';
    anotherDownloadButton.style.display = 'none';
    extraDownloadButton.style.display = 'none';
    extraDownloadButton2.style.display = 'none';
    extraDownloadButton3.style.display = 'none';
    extraDownloadButton4.style.display = 'none';
    extraDownloadButton5.style.display = 'none';
    extraDownloadButton6.style.display = 'none';

    // Função para exibir mensagens e botões de download
    function displayMessagesAndButtons() {
        // Exibindo as mensagens e botões com intervalos de tempo
        setTimeout(() => {
            codeArea.innerHTML += '<p class="highlight">Conectando ao Banco de dados NKLY...</p>';
            codeArea.scrollTop = codeArea.scrollHeight;
        }, 500);

        setTimeout(() => {
            codeArea.innerHTML += '<p class="highlight-waiting">Esperando...</p>';
            codeArea.scrollTop = codeArea.scrollHeight;
        }, 1500);

        setTimeout(() => {
            typeText('Insira suas informações:\nUser: Nikolay\nPassword: Verdante@2015\n', 50);
        }, 2500);

        // Adicionar um delay para simular a validação das informações
        setTimeout(() => {
            codeArea.innerHTML += '<p class="highlight">Validando informações...</p>';
            codeArea.scrollTop = codeArea.scrollHeight;
        }, 7000); // Delay adicional após a digitação das informações

        // Aumentar o tempo de espera para mostrar que a validação foi concluída
        setTimeout(() => {
            codeArea.innerHTML += '<p class="highlight-waiting">Usuário conectado!!</p>\n\n';
            codeArea.scrollTop = codeArea.scrollHeight;
            mainMessage.style.display = 'block';
            userCodeInput.style.display = 'inline-block';
        }, 9500); // Ajuste o tempo total conforme necessário
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

    displayMessagesAndButtons(); // Inicia a exibição das mensagens e botões

    // Função para o usuário enviar código
    window.submitCode = function() {
        const userCode = document.getElementById('user-code').value.trim();
        const codeArea = document.getElementById('code-area');
        const response = document.createElement('p');
        response.className = 'user-feedback'; // Adiciona uma classe para estilização de feedback

        // Esconde os botões até que o código seja validado
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
            response.style.color = '#ff0000'; // Vermelho para feedback de código inválido
            codeArea.appendChild(response);
            return;
        }

        if (isValidCode(userCode)) {
            // Se o código for válido, chama a função de resposta do chat
            RespostaChat(userCode);
        } else {
            // Se o código for inválido
            response.textContent = `> Código inserido: ${userCode}\n> Código inválido. Tente novamente.`;
            response.style.color = '#ff0000'; // Vermelho para feedback de código inválido
            codeArea.appendChild(response);
        }

        // Faz a rolagem para o final da área de código sempre que uma nova mensagem é adicionada
        codeArea.scrollTop = codeArea.scrollHeight;
    }

    // Função para verificar se o código é válido
    function isValidCode(code) {
        const validCodes = [
            'manual', 'Astaroth:imagem', 'Audio:01', 'Audio:02', 
            'Audio:03', 'Audio:04', 'Audio:05', 'Nikolay:trabalho', 'Nikolay:idade', 'Nikolay:contato'
        ]; // Lista de códigos válidos
        return validCodes.includes(code);
    }

    // Função para exibir resposta do chat
    function RespostaChat(code) {
        const response = document.createElement('p');
        response.className = 'user-feedback'; // Adiciona uma classe para estilização de feedback
        if (code === 'Nikolay:trabalho') {
            response.textContent = `> Nikolay é um investigador paranormal freelancer.`;
            response.style.color = '#00ff00'; // Verde para feedback de código válido
        } 
        
        if (code === 'Nikolay:idade') {
            response.textContent = `> Nikolay deveria ter 35 anos, em 2024.`;
            response.style.color = '#00ff00'; // Verde para feedback de código válido
        }

        if (code === 'Nikolay:contato') {
            response.textContent = `> Você pode me contatar para serviços, via Gmail! "nikolayverdante@gmail.com"`;
            response.style.color = '#00ff00'; // Verde para feedback de código válido
        }
        
        else {
            response.textContent = `> Código inserido: ${code}\n> Código aceito. Aguarde...`;
            response.style.color = '#00ff00'; // Verde para feedback de código válido
            createDownloadButtons(code);
        }
        codeArea.appendChild(response);
    }

    // Função para download do documento
    function downloadDocument() {
        const link = document.createElement('a');
        link.href = './documentos/arquivo.pdf'; // Caminho do primeiro documento
        link.download = 'arquivo.pdf';
        link.click();
    }

    // Função para criar botões de download com base no código
    function createDownloadButtons(code) {
        if (code === 'manual') {
            extraDownloadButton.style.display = 'inline-block';
            extraDownloadButton.onclick = () => downloadExtraDocument(code);
        }
        if (code === 'Astaroth:imagem') {
            anotherDownloadButton.style.display = 'inline-block';
            anotherDownloadButton.onclick = () => downloadAnotherDocument(code);
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

    // Função para download do documento extra 2
    function downloadExtraDocument2(code) {
        const link = document.createElement('a');
        link.href = './documentos/audio01.mp3';
        link.download = 'audio01.mp3';
        link.click();
    }

    // Função para download do documento extra 3
    function downloadExtraDocument3(code) {
        const link = document.createElement('a');
        link.href = './documentos/fita02.mp4';
        link.download = 'audio02.mp3';
        link.click();
    }

    // Função para download do documento extra
    function downloadExtraDocument(code) {
        const link = document.createElement('a');
        link.href = './documentos/manual.pdf';
        link.download = 'manual.pdf';
        link.click();
    }

    // Função para download do outro documento
    function downloadAnotherDocument(code) {
        const link = document.createElement('a');
        link.href = './documentos/astaroth.png';
        link.download = 'astaroth.png';
        link.click();
    }

    // Função para download do documento extra 4
    function downloadExtraDocument4(code) {
        const link = document.createElement('a');
        link.href = './documentos/fita03.mp4';
        link.download = 'fita003.mp4';
        link.click();
    }

    // Função para download do documento extra 5
    function downloadExtraDocument5(code) {
        const link = document.createElement('a');
        link.href = './documentos/fita04.mp4';
        link.download = 'relatorio_final.pdf';
        link.click();
    }

    // Função para download do documento extra 6
    function downloadExtraDocument6(code) {
        const link = document.createElement('a');
        link.href = './documentos/fita05.mp4';
        link.download = 'anexo_secreto.zip';
        link.click();
    }
});
