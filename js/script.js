const btn_jogar = document.querySelector(".btn_jogar button");
const quiz_box = document.querySelector(".quiz_box");
const listaOpcoes = document.querySelector(".listaq");
const result_box = document.querySelector(".result_box");
const restart = result_box.querySelector(".restart");
const sair = result_box.querySelector(".sair");
let pontuacao = 0;
let questaoOrdem = 0;
let numeroquestao = 1;
sair.onclick = () =>{
    location.reload();
}
restart.onclick = () => {
    result_box.classList.remove("resultAtivo");
    quiz_box.classList.add("quizAtivo");
    pontuacao = 0;
    mostrarQuestao(0);
    questaoOrdem = 0;
    numeroquestao = 1;
    contadorQuestoes();
    prox_questao = () => {
        mostrarQuestao(questaoOrdem);
        if (questaoOrdem < questoes.length - 1) {
            questaoOrdem++;
            numeroquestao++
            mostrarQuestao(questaoOrdem);
            contadorQuestoes(numeroquestao);

        }
        else {
            console.log("tudo completo");
            mostrarResultBox();
        }
    }
}
btn_jogar.onclick = () => {
    btn_jogar.classList.add("btnDesativado");
    quiz_box.classList.add("quizAtivo");
    mostrarQuestao(0);
};

function mostrarQuestao(index) {
    const textQuestao = document.querySelector(".questao");

    let titulo_Questao = '<span>' + questoes[index].ordem + ". " + questoes[index].questao + '</span>';
    let listaq = '<div class="opcao"><span>' + questoes[index].opcoes[0] + '</span></div>'
        + '<div class="opcao"><span>' + questoes[index].opcoes[1] + '</span></div>'
        + '<div class="opcao"><span>' + questoes[index].opcoes[2] + '</span></div>'
        + '<div class="opcao"><span>' + questoes[index].opcoes[3] + '</span></div>'
        + '<div class="opcao"><span>' + questoes[index].opcoes[4] + '</span></div>';
    textQuestao.innerHTML = titulo_Questao;
    listaOpcoes.innerHTML = listaq;
    const opcao = listaOpcoes.querySelectorAll(".opcao");
    for (let i = 0; i < opcao.length; i++) {
        opcao[i].setAttribute("onclick", "qSelecionado(this)");
    }
}
function contadorQuestoes() {
    const contadorQuestao = quiz_box.querySelector(".total_questao");
    let total_questao = '<span> ' + numeroquestao + ' de ' + questoes.length + ' Questões</span>';
    contadorQuestao.innerHTML = total_questao;
}

function qSelecionado(resposta) {

    let respUser = resposta.textContent;
    let respostaCorreta = questoes[questaoOrdem].resposta;
    let todasOpcoes = listaOpcoes.children.length;
    if (respUser == respostaCorreta) {
        pontuacao += 1;
        resposta.classList.add("certa");
        console.log(pontuacao);
        console.log("Resposta Correta");
    }
    else {
        resposta.classList.add("errada");
        console.log("Resposta Incorreta");
        window.navigator.vibrate(500);
        for (let i = 0; i < todasOpcoes; i++){
            if(listaOpcoes.children[i].textContent === respostaCorreta){
                listaOpcoes.children[i].setAttribute("class", "opcao certa");
            }
    }
}
    for (let i = 0; i < todasOpcoes; i++) {
        listaOpcoes.children[i].classList.add("disabled");

    }
    setTimeout(prox_questao = () => {
        mostrarQuestao(questaoOrdem);
        if (questaoOrdem < questoes.length - 1) {
            questaoOrdem++;
            numeroquestao++
            mostrarQuestao(questaoOrdem);
            contadorQuestoes(numeroquestao);

        }
        else {
            console.log("tudo completo");
            mostrarResultBox();
        }
    }, 2000);
}
function mostrarResultBox() {
    btn_jogar.classList.add("btnDesativado");
    quiz_box.classList.remove("quizAtivo");
    result_box.classList.add("resultAtivo");
    const pontuacaoTexto = result_box.querySelector(".pontuacao");
    if (pontuacao > 3) {
        let pontuacaoTag = '<span>Acertou ' + pontuacao + ' de 5!</p>Muito Bem 😎!</span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    }
    else if (pontuacao > 1) {
        let pontuacaoTag = '<span>Acertou ' + pontuacao + ' de 5!</p>Ficou na média!👌</span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    }
    else {
        let pontuacaoTag = '<span>Só acertou ' + pontuacao + ' de 5!</p>😢</span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    }
}