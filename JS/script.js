function checkAnswer() {
    const answer = document.getElementById('answer').value.toLowerCase();
    const correctAnswer = "43sentençaprofecia"; // A resposta correta
    const submitButton = document.getElementById('submit-btn');

    if (answer === correctAnswer) {
        // Adiciona a classe para o glow verde e efeitos adicionais
        submitButton.classList.add('correct-answer');

        // Após um atraso de 3 segundos, redireciona para outra página
        setTimeout(() => {
            window.location.href = "nkly.html"; // Substitua "proxima-pagina.html" pelo URL da página de destino
        }, 3000);
    } else {
        alert("Resposta incorreta, tente novamente.");
    }
}
(function() {
    let devtoolsOpen = false;
    const threshold = 160;

    function detectDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        if ((widthThreshold || heightThreshold) && !devtoolsOpen) {
            devtoolsOpen = true;
            window.location.href = 'https://m.youtube.com/watch?v=dQw4w9WgXcQ';
        } else if (!widthThreshold && !heightThreshold && devtoolsOpen) {
            devtoolsOpen = false;
        }
    }

    // Check DevTools status at regular intervals
    setInterval(detectDevTools, 1000);

    // Check when the page is loaded
    window.addEventListener('load', detectDevTools);

    // Check when the window is resized
    window.addEventListener('resize', detectDevTools);

    // Check when user clicks anywhere on the page
    document.addEventListener('click', detectDevTools);

    // Optionally, check when the user presses any key
    document.addEventListener('keydown', detectDevTools);
})();

function doarViaPix() {
    const popup = document.getElementById('pix-popup');
    const popupContent = document.querySelector('.pix-popup-content');
    
    popupContent.classList.remove('slide-out');
    popup.style.display = 'flex'; 
}

function fecharPopup() {
    const popupContent = document.querySelector('.pix-popup-content');

   
    popupContent.classList.add('slide-out');

    
    setTimeout(() => {
        const popup = document.getElementById('pix-popup');
        popup.style.display = 'none';
    }, 500); 
}