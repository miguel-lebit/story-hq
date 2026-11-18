const svgLeo = `<svg viewBox="0 0 100 100" width="120" height="120">
    <rect width="100" height="100" fill="#bae6fd"/>
    <circle cx="50" cy="45" r="22" fill="#fed7aa" stroke="#000" stroke-width="3"/>
    <path d="M28 40 Q50 15 72 40" fill="#1e293b" stroke="#000" stroke-width="3"/>
    <rect x="22" y="35" width="8" height="18" rx="4" fill="#ef4444" stroke="#000" stroke-width="2"/>
    <rect x="70" y="35" width="8" height="18" rx="4" fill="#ef4444" stroke="#000" stroke-width="2"/>
    <circle cx="43" cy="45" r="3" fill="#000"/><circle cx="57" cy="45" r="3" fill="#000"/>
    <path d="M44 54 Q50 60 56 54" fill="none" stroke="#000" stroke-width="3"/>
    <path d="M25 95 Q50 68 75 95 Z" fill="#ef4444" stroke="#000" stroke-width="3"/>
</svg>`;

const svgNova = `<svg viewBox="0 0 100 100" width="120" height="120">
    <rect width="100" height="100" fill="#1e1b4b"/>
    <circle cx="50" cy="45" r="22" fill="#fde68a" stroke="#000" stroke-width="3"/>
    <path d="M26 38 L50 12 L74 38 Z" fill="#38bdf8" stroke="#000" stroke-width="3"/>
    <rect x="32" y="38" width="36" height="11" rx="3" fill="#f43f5e" stroke="#000" stroke-width="2"/>
    <path d="M44 56 L56 56" stroke="#000" stroke-width="3"/>
    <path d="M22 95 L32 68 L68 68 L78 95 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
</svg>`;

const svgMax = `<svg viewBox="0 0 100 100" width="120" height="120">
    <rect width="100" height="100" fill="#fef08a"/>
    <polygon points="15,95 50,60 85,95" fill="#dc2626" stroke="#000" stroke-width="3"/>
    <circle cx="50" cy="45" r="22" fill="#d97706" stroke="#000" stroke-width="3"/>
    <path d="M28 36 Q50 20 72 36" fill="#451a03" stroke="#000" stroke-width="3"/>
    <circle cx="43" cy="45" r="3" fill="#000"/><circle cx="57" cy="45" r="3" fill="#000"/>
    <path d="M42 53 Q50 62 58 53" fill="none" stroke="#000" stroke-width="3"/>
    <path d="M28 95 Q50 70 72 95 Z" fill="#16a34a" stroke="#000" stroke-width="3"/>
</svg>`;

const herois = [
    { nome: "Leo Urbano", poder: "Mente Rápida", svg: svgLeo },
    { nome: "Nova Cyber", poder: "Hacker de Código", svg: svgNova },
    { nome: "Max Aventura", poder: "Super Agilidade", svg: svgMax }
];

document.getElementById("svg-0").innerHTML = svgLeo;
document.getElementById("svg-1").innerHTML = svgNova;
document.getElementById("svg-2").innerHTML = svgMax;

let heroiAtual = null;

function selecionarHeroi(indice, elementoCard) {
    heroiAtual = herois[indice];
    document.querySelectorAll('.card-heroi').forEach(c => c.classList.remove('selecionado'));
    elementoCard.classList.add('selecionado');

    const btn = document.getElementById('btn-iniciar');
    btn.disabled = false;
    btn.innerText = "▶ JOGAR COM " + heroiAtual.nome.toUpperCase();
}

function iniciarJogo() {
    document.getElementById('tela-selecao').classList.add('escondido');
    document.getElementById('tela-historia').classList.remove('escondido');
    document.getElementById('avatar-cena').innerHTML = heroiAtual.svg;
    document.getElementById('nome-cena').innerText = heroiAtual.nome;
    carregarCena('inicio');
}

function carregarCena(idCena) {
    const textoEl = document.getElementById('texto-cena');
    const efeitoEl = document.getElementById('efeito-sonoro');
    const opcoesEl = document.getElementById('container-opcoes');
    opcoesEl.innerHTML = '';

    if (idCena === 'inicio') {
        efeitoEl.innerText = "BZZZT!!";
        textoEl.innerText = "O sinal da escola tocou, mas as luzes da sala começaram a piscar! Na lousa, um código secreto apareceu brilhando: '2 + 2 x 2 = ?'. O que você faz?";

        criarBotao("1. Tocar no quadro negro para investigar", () => carregarCena('tocar_quadro'));
        criarBotao("2. Gritar para avisar toda a turma", () => carregarCena('avisar_turma'));
        criarBotao("3. [PODER: " + heroiAtual.poder + "] Decifrar o código na hora!", () => carregarCena('usar_poder'), true);
    }
    else if (idCena === 'tocar_quadro') {
        efeitoEl.innerText = "WHOOSH!!";
        textoEl.innerText = "Ao encostar no quadro, uma passagem secreta se abre atrás da estante de livros! Lá dentro há um laboratório cheio de computadores antigos.";
        criarBotao("Entrar no laboratório secreto", () => carregarCena('final_laboratorio'));
        criarBotao("Voltar e escolher outra ação", () => carregarCena('inicio'));
    }
    else if (idCena === 'avisar_turma') {
        efeitoEl.innerText = "CRASH!!";
        textoEl.innerText = "Todos correm para a porta, mas ela está trancada! O código na lousa começa uma contagem regressiva: 10... 9... 8...";
        criarBotao("Responder que o resultado é 6 (multiplicação primeiro!)", () => carregarCena('final_heroi'));
        criarBotao("Responder que o resultado é 8", () => carregarCena('final_erro'));
    }
    else if (idCena === 'usar_poder') {
        efeitoEl.innerText = "ZAP!! ⚡";
        textoEl.innerText = "Usando sua habilidade [" + heroiAtual.poder + "], você percebe na hora que na matemática a multiplicação vem antes da soma (2 + 4 = 6) e desativa a armadilha!";
        criarBotao("Ver seu final de herói!", () => carregarCena('final_heroi'));
    }
    else if (idCena === 'final_laboratorio') {
        efeitoEl.innerText = "FIM - PARTE 1";
        textoEl.innerText = "Você encontrou o servidor central da escola! " + heroiAtual.nome + " descobriu um novo mundo onde aprender é uma aventura. Parabéns!";
        criarBotao("🔄 Jogar Novamente com Outro Personagem", () => location.reload());
    }
    else if (idCena === 'final_heroi') {
        efeitoEl.innerText = "VITÓRIA!! 🏆";
        textoEl.innerText = "A resposta 6 destrancou todas as portas e transformou a sala em um portal de jogos educativos! " + heroiAtual.nome + " salvou o dia!";
        criarBotao("🔄 Jogar Novamente", () => location.reload());
    }
    else if (idCena === 'final_erro') {
        efeitoEl.innerText = "POOF!! 💨";
        textoEl.innerText = "Ops! Na matemática, fazemos 2 x 2 primeiro (4) e depois somamos 2 (total 6). Uma fumaça colorida encheu a sala!";
        criarBotao("↩ Tentar o desafio novamente", () => carregarCena('avisar_turma'));
    }
}

function criarBotao(texto, acao, especial = false) {
    const btn = document.createElement('button');
    btn.className = especial ? 'btn-hq btn-opcao btn-especial' : 'btn-hq btn-opcao';
    btn.innerText = texto;
    btn.onclick = acao;
    document.getElementById('container-opcoes').appendChild(btn);
}

