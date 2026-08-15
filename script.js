function nextStepSituation() {
    const textoSituacao = document.querySelector('.situacao input').value;
    // Verifica se tem texto para evitar erro
    if(textoSituacao.length >= 10) {
        document.querySelector('.cartaSup h2').textContent = textoSituacao;
        document.querySelector('.situacao').style.display = 'none';
        document.querySelector('.pensamento').style.display = 'block';
    }
}

function backToSituation() {
    document.querySelector('.pensamento').style.display = 'none';
    document.querySelector('.situacao').style.display = 'block';
}

function nextStepThought() {
    const textoPensamento = document.querySelector('.pensamento input').value;
    
    document.querySelector('.cartaCen p').textContent = textoPensamento;
    
    document.querySelector('.pensamento').style.display = 'none';
    document.querySelector('.saida').style.display = 'block';
}

function backToThought() {
    document.querySelector('.saida').style.display = 'none';
    document.querySelector('.pensamento').style.display = 'block';
}

// Avança da Saída para a Emoção
function nextStepSaida() {
    // 1. Pega o valor digitado no input da saída
    const textoSaida = document.querySelector('.saida input').value;
    
    // 2. Joga o texto no elemento correspondente da carta
    const h3Carta = document.querySelector('.cartaCen h3');
    if (h3Carta) {
        h3Carta.textContent = textoSaida;
    }
    
    // 3. Esconde a tela de saída e mostra a tela de emoção
    document.querySelector('.saida').style.display = 'none';
    document.querySelector('.emocao').style.display = 'block';
}

function backToSaida() {
    document.querySelector('.emocao').style.display = 'none';
    document.querySelector('.saida').style.display = 'block';
}

// Controle do Carrossel
let currentPosition = 0;
const itemWidth = 50; // largura de cada ícone em px
const itemsPerJump = 5; // quantidade de emojis por pulo
const jumpStep = itemWidth * itemsPerJump; // 250px

const maxScroll = -(9 * itemWidth - (itemWidth * 5)); // Limite máximo

function nextSlide() {
    if (currentPosition > maxScroll) {
        currentPosition -= jumpStep; 
        const track = document.getElementById('track');
        if (track) {
            track.style.transform = `translateX(${currentPosition}px)`;
        }
    }
}

function prevSlide() {
    if (currentPosition < 0) {
        currentPosition += jumpStep; 
        const track = document.getElementById('track');
        if (track) {
            track.style.transform = `translateX(${currentPosition}px)`;
        }
    }
}