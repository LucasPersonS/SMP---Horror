document.addEventListener('DOMContentLoaded', () => {
    const codeArea = document.getElementById('code-area');
    const downloadButton = document.getElementById('download-button');
    const userCodeInput = document.getElementById('user-code');
    const audioPlayerContainer = document.getElementById('audio-player-container'); // Contêiner para o player de áudio

    userCodeInput.style.display = 'none';
    downloadButton.style.display = 'none';
    audioPlayerContainer.style.display = 'none'; // Ocultar o player de áudio inicialmente

    let isAuthenticated = false; 
    let isAwaitingPassword = false; 

    const fileMap = {
        'manual': './documentos/manual.pdf',
        'Astaroth:imagem': './documentos/astaroth.png',
        'ORIS': './documentos/oris.png',
        'Audio:01': './documentos/audio01.mp3',
        'Audio:02': './documentos/audio02.mp3',
        'Audio:03': './documentos/audio03.mp3',
        'Audio:04': './documentos/audio04.mp3',
        'Audio:05': './documentos/audio05.mp3',
        'Missão': './documentos/missao.png',
        '4ST4R0TH': './img/caderno-anotac-nikolay.png',
        'Cripta': './documentos/cripta-audio.mp3'
    };

    const validCodes = Object.keys(fileMap); 

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
            isAwaitingPassword = true; 
            userCodeInput.style.display = 'inline-block';

            passwordInputListener = (event) => {
                const passwordDisplay = document.getElementById('password-display');
                passwordDisplay.textContent = event.target.value; 
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
        const userCode = userCodeInput.value.trim();
        const response = document.createElement('p');
        response.className = 'user-feedback';

        downloadButton.style.display = 'none';
        audioPlayerContainer.style.display = 'none'; // Sempre esconder o player de áudio antes de verificar

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
                    codeArea.innerHTML += '<p class="highlight-waiting">Digite "manual" para receber uma instrução da máquina</p>\n\n';
                    userCodeInput.removeEventListener('input', passwordInputListener); 
                } else {
                    response.textContent = '> Senha incorreta. Tente novamente.';
                    response.style.color = '#ff0000';
                    codeArea.appendChild(response);
                }
                document.getElementById('password-display').textContent = '';
            }, 2000);
        } else if (isAuthenticated) {
            if (userCode === 'Segredo') {
                displaySecretLink();
            } else if (isValidCode(userCode)) {
                handleValidCode(userCode);
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
        return validCodes.includes(code);
    }

    function handleValidCode(code) {
        const response = document.createElement('p');
        response.className = 'user-feedback';
        response.style.color = '#00ff00'; 

        const fileUrl = fileMap[code];

        if (fileUrl) {
            if (fileUrl.endsWith('.mp3')) {
                displayAudioPlayer(fileUrl); // Exibir player de áudio se for um arquivo de áudio
                response.textContent = `> Código aceito. Tocando o áudio: ${code}`;
            } else {
                response.textContent = `> Código aceito. Baixe o arquivo: ${code}`;
                showDownloadButton(fileUrl); // Exibir o botão de download
            }
        } else {
            response.textContent = '> Nenhum arquivo associado a este código.';
        }

        codeArea.appendChild(response);
    }

    function showDownloadButton(fileUrl) {
        downloadButton.style.display = 'inline-block';
        downloadButton.onclick = () => downloadFile(fileUrl);
    }

    function downloadFile(fileUrl) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop(); 
        link.click();
    }

    function displaySecretLink() {
        const secretLink = document.createElement('p');
        secretLink.innerHTML = '> Segredo revelado: <a href="https://docs.google.com/forms/d/e/1FAIpQLSe3HalQEf1TYd8kUSp-q31A9ICx9GJNkpoI5l91xDo82YXo6A/viewform?usp=sf_link" target="_blank">Clique aqui para acessar o formulário</a>';
        secretLink.style.color = '#00ff00';
        codeArea.appendChild(secretLink);
    }

    function displayAudioPlayer(filePath) {
        audioPlayerContainer.style.display = 'block';
        audioPlayerContainer.innerHTML = `
            <audio controls>
                <source src="${filePath}" type="audio/mpeg">
                Seu navegador não suporta a reprodução de áudio.
            </audio>
        `;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const hint1 = document.getElementById('hint1');
    const triggerZone = document.getElementById('trigger-zone');

    // Exibir a dica ao passar o mouse sobre a trigger zone
    triggerZone.addEventListener('mouseover', () => {
        hint1.style.display = 'block';
    });

    triggerZone.addEventListener('mouseout', () => {
        hint1.style.display = 'none';
    });
});

(function() {
    let devtoolsOpen = false;
    const redirectUrl = 'https://m.youtube.com/watch?v=dQw4w9WgXcQ';

    function detectDevTools() {
        // Cria um breakpoint via console.log e mede o tempo de execução
        const start = new Date();
        debugger;
        const time = new Date() - start;

        // Se o tempo de execução for significativo, significa que o DevTools está aberto
        if (time > 100) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                window.location.href = redirectUrl;
            }
        } else {
            devtoolsOpen = false;
        }
    }

    // Verifica a cada segundo
    setInterval(detectDevTools, 1000);

    // Verifica ao carregar a página
    window.addEventListener('load', detectDevTools);

    // Verifica ao redimensionar a janela
    window.addEventListener('resize', detectDevTools);

    // Verifica ao clicar em qualquer parte da página
    document.addEventListener('click', detectDevTools);

    // Verifica ao pressionar qualquer tecla
    document.addEventListener('keydown', detectDevTools);
})();
