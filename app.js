const botaoNovoJogo = document.getElementById('botao-novo-jogo');
const botaoAdivinhar = document.getElementById('botao-adivinhar');
const inputPalpite = document.getElementById('input-palpite-id');
const resultadoPalpite = document.getElementById('resultado-palpite');
const numeroSecreto = Math.floor(Math.random() * 10) + 1;
let tentativas = 0;

botaoAdivinhar.addEventListener('click', () => {
    const palpite = parseInt(inputPalpite.value);
    tentativas++;

    if (isNaN(palpite) || palpite < 1 || palpite > 10) {
        resultadoPalpite.textContent = 'Por favor, digite um número válido entre 1 e 10.';
        responsiveVoice.speak('Por favor, digite um número válido entre 1 e 10.', 'Brazilian Portuguese Female');
    } else if (palpite === numeroSecreto) {
        resultadoPalpite.textContent = `Parabéns! Você acertou o número secreto ${numeroSecreto} em ${tentativas} tentativas.`;
        responsiveVoice.speak('Parabéns! Você acertou o número secreto.', 'Brazilian Portuguese Female');
        botaoAdivinhar.disabled = true;
    } else if (palpite < numeroSecreto) {
        resultadoPalpite.textContent = 'Tente um número maior.';
        responsiveVoice.speak('Tente um número maior.', 'Brazilian Portuguese Female');
    } else {
        resultadoPalpite.textContent = 'Tente um número menor.';
        responsiveVoice.speak('Tente um número menor.', 'Brazilian Portuguese Female');
    }
});

function resetarJogo() {
    location.reload();
}

botaoNovoJogo.addEventListener('click', resetarJogo);
document.getElementById('botao-novo-jogo').setAttribute('disabled', true);

if (botaoAdivinhar.disabled) {
    document.getElementById('botao-novo-jogo').setAttribute('enabled', true);
}