
const telaInicio = document.getElementById('tela-inicio');
const telaLoading = document.getElementById('tela-loading');
const botaoStart = document.getElementById('botao-start');
const barraProgresso = document.getElementById('barra-progresso');
const musicaJogo = document.getElementById('musica-jogo');

const botaoAdivinhar = document.getElementById('botao-adivinhar');
const botaoNovoJogo  = document.getElementById('botao-novo-jogo');
const inputPalpite   = document.getElementById('input-palpite-id');
const resultado      = document.getElementById('resultado-palpite');

let numeroSecreto;
let tentativas;


function falar(texto) {
    setTimeout(() => {
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.1});
    }, 100);
}


botaoStart.addEventListener('click', () => {

    musicaJogo.volume = 0.1;
    musicaJogo.play();


    telaInicio.classList.add('escondido');
    telaLoading.classList.remove('escondido');


    let progresso = 0;
    const intervalo = setInterval(() => {

        progresso += Math.floor(Math.random() * 15) + 5; 
        
        if (progresso >= 100) {
            progresso = 100;
            barraProgresso.style.width = progresso + '%';
            clearInterval(intervalo);
            

            setTimeout(() => {
                telaLoading.classList.add('escondido');
                iniciarJogo();
                falar("Bem-vindo a Fire Guess! Tente adivinhar o número secreto.");
            }, 600); 
        } else {
            barraProgresso.style.width = progresso + '%';
        }
    }, 300); 
});

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 50) + 1;
    tentativas = 0;
    
    inputPalpite.value = '';
    inputPalpite.focus();
    resultado.textContent = '';
    botaoAdivinhar.disabled = false;
    botaoNovoJogo.disabled = true;
}


botaoAdivinhar.addEventListener('click', () => {
    const palpite = Number(inputPalpite.value);
    tentativas++;

    if (!Number.isInteger(palpite) || palpite < 1 || palpite > 50) {
        resultado.textContent = 'Digite um número entre 1 e 50!';
        falar('Digite um número entre 1 e 50');
        inputPalpite.select();
        return;
    }

    if (palpite === numeroSecreto) {
        resultado.textContent = `🔥 PARABÉNS! Você acertou o ${numeroSecreto} em ${tentativas} tentativa${tentativas === 1 ? '' : 's'}!`;
        falar('Parabéns! Você acertou!');
        botaoAdivinhar.disabled = true;
        botaoNovoJogo.disabled = false;
        inputPalpite.disabled = true;
    } 
    else if (palpite < numeroSecreto) {
        resultado.textContent = 'Tente um número MAIOR.';
        falar('Tente um número maior');
    } 
    else {
        resultado.textContent = 'Tente um número MENOR.';
        falar('Tente um número menor');
    }

    inputPalpite.value = '';
    inputPalpite.focus();
});


botaoNovoJogo.addEventListener('click', () => {
    inputPalpite.disabled = false;
    iniciarJogo();
    falar('Novo jogo iniciado. Boa sorte!');
});