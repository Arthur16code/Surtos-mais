// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDpUNZa4l3lST1M6hpScKlDD611wcvjDxk",
    authDomain: "surtosemais.firebaseapp.com",
    projectId: "surtosemais",
    storageBucket: "surtosemais.firebasestorage.app",
    messagingSenderId: "953707762693",
    appId: "1:953707762693:web:356e645c9c59f36721386c",
    measurementId: "G-G665W1RELQ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Variável global para guardar a emoção escolhida no momento
let emocaoSelecionada = '';

// Dicionário com os SVGs
const svgsEmocoes = {
    'sentiment_content': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="M360-340h240v-60H360v60Zm-20-280q-32 0-59.5 18T235-556l50 33q10-15 24-25.5t31-10.5q17 0 31 10.5t24 24.5l50-33q-18-27-45.5-45T340-620Zm280 0q-32 0-59.5 18T515-556l50 33q10-14 24-24.5t31-10.5q17 0 31.5 10t23.5 25l50-33q-18-28-45.5-46T620-620ZM324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/></svg>',
    'sentiment_neutral': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm20 180h240v-60H360v60Zm-36 228.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/></svg>',
    'sentiment_very_dissatisfied': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="M356.5-381.5Q301-343 276-280h408q-25-63-80.5-101.5T480-420q-68 0-123.5 38.5ZM312-480l44-42 42 42 42-42-42-42 42-44-42-42-42 42-44-42-42 42 42 44-42 42 42 42Zm250 0 42-42 44 42 42-42-42-42 42-44-42-42-44 42-42-42-42 42 42 44-42 42 42 42ZM324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/></svg>',
    'sentiment_very_satisfied': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="M603.5-298.5Q659-337 684-400H276q25 63 80.5 101.5T480-260q68 0 123.5-38.5ZM312-520l44-42 42 42 42-42-84-86-86 86 42 42Zm250 0 42-42 44 42 42-42-86-86-84 86 42 42ZM324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/></svg>',
    'sentiment_excited': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="M410-510.5q28-30.5 39-72.5l-58-14q-5 22-17.5 39.5T340-540q-21 0-33.5-17.5T289-597l-58 14q11 42 39 72.5t70 30.5q42 0 70-30.5ZM480-260q39 0 75-17.5t67-52.5l-44-40q-22 24-47 36.5T480-321q-26 0-51-12.5T382-370l-44 40q32 35 67.5 52.5T480-260Zm210-250.5q28-30.5 39-72.5l-58-14q-5 22-17.5 39.5T620-540q-21 0-33.5-17.5T569-597l-58 14q11 42 39 72.5t70 30.5q42 0 70-30.5ZM-366 399Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm241 241q99-99 99-241t-99-241q-99-99-241-99t-241 99q-99 99-99 241t99 241q99 99 241 99t241-99Z"/></svg>',
    'sentiment_frustrated': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="M391-240q17 0 32.5-6t30.5-14q6-4 12.5-7t13.5-3q8 0 26 10 15 8 30.5 14t32.5 6q50 0 80.5-35.5T680-370q0-72-49.5-111T488-520h-16q-93 0-142.5 39T280-370q0 59 30.5 94.5T391-240Zm-1-60q-24 0-37.5-18.5T339-370q0-46 32.5-68T472-460h15q68 0 100 22t32 68q0 33-13 51.5T569-300q-12 0-34-12-13-8-26.5-13t-28.5-5q-15 0-29 5t-27 13q-8 5-16.5 8.5T390-300ZM251-532q60-24 96-53t68-79l-50-32q-26 41-54.5 63T228-588l23 56Zm457 0 23-56q-53-22-81-44t-55-64l-50 32q32 50 68 78.5t95 53.5ZM324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/></svg>',
    'sentiment_worried': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="M452-240h56q55 0 93.5-35t38.5-85q0-50-38.5-85T508-480h-56q-55 0-93.5 35T320-360q0 50 38.5 85t93.5 35Zm0-60q-30 0-51-17.5T380-360q0-25 21-42.5t51-17.5h56q30 0 51 17.5t21 42.5q0 25-21 42.5T508-300h-56ZM240-560h80q50 0 85-35t35-85h-60q0 25-17.5 42.5T320-620h-80v60Zm400 0h80v-60h-80q-25 0-42.5-17.5T580-680h-60q0 50 35 85t85 35ZM324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/></svg>',
    'sentiment_satisfied': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm263.5 221.5Q659-337 684-400h-66q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-66q25 63 80.5 101.5T480-260q68 0 123.5-38.5ZM324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/></svg>',
    'sentiment_stressed': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="m298-456 143-104-143-104-36 48 77 56-77 56 36 48Zm364 0 36-48-77-56 77-56-36-48-143 104 143 104ZM420-278l60-60 60 60 60-60 39 39 42-42-81-81-60 60-60-60-60 60-60-60-81 81 42 42 39-39 60 60Zm-96 166.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/></svg>',
    'sentiment_extremely_dissatisfied': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="M480-80q-83 0-156-31.5t-127-86Q143-252 111.5-325T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 155.5 31.5t127 85.5q54.5 54 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-60q141 0 240.5-99.5T820-480q0-142-99.5-241T480-820q-142 0-241 99t-99 241q0 141 99 240.5T480-140Zm73-391 14-8q3 20 18 33t35 13q23 0 38.5-15.5T674-547q0-13-5.5-24T653-590l27-15-20-35-127 73 20 36Zm-146 0 20-36-127-73-20 35 27 15q-10 8-15.5 19t-5.5 24q0 23 15.5 38.5T340-493q20 0 35-13t18-33l14 8Zm73 94q-69 0-121 45.5T281-280h398q-27-65-78.5-111T480-437Zm0-43Z"/></svg>',
    'sentiment_dissatisfied': '<svg xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#000"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm16.5 138.5Q301-343 276-280h66q22-37 58.5-58.5T480-360q43 0 79.5 21.5T618-280h66q-25-63-80.5-101.5T480-420q-68 0-123.5 38.5Zm-32.5 270Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/></svg>'
};

function selectEmotion(tipoEmocao) {
    // 1. Guarda o nome do sentimento na variável global
    emocaoSelecionada = tipoEmocao;

    let spanAlvo = document.getElementById('icone-resultado');
    
    if (spanAlvo && svgsEmocoes[tipoEmocao]) {
        spanAlvo.innerHTML = svgsEmocoes[tipoEmocao];
    }
    
    const btnPsicologa = document.querySelector('.btn-psicologa');
    if (btnPsicologa) {
        btnPsicologa.style.display = 'inline-flex';
    }
}

function salvarNoFirebase() {
    const situacao = document.querySelector('.cartaSup h2')?.textContent || '';
    const pensamento = document.querySelector('.cartaCen p')?.textContent || '';
    const saida = document.querySelector('.cartaCen h3')?.textContent || '';

    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');
    const segundo = String(agora.getSeconds()).padStart(2, '0');

    const idOrdenavel = `${ano}${mes}${dia}${hora}${minuto}${segundo}`;
    const dataHumana = `${dia}/${mes}/${ano} às ${hora}:${minuto}`;

    db.collection("surtos").doc(idOrdenavel).set({
        dataHumana: dataHumana,
        situacao: situacao,
        pensamento: pensamento,
        saida: saida,
        emocao: emocaoSelecionada // 2. Envia o nome do sentimento para o Firestore
    })
    .then(() => {
        alert("Salvo com sucesso!");
    })
    .catch((error) => {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar dados.");
    });
}