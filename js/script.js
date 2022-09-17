const btn_jogar = document.querySelector(".btn_jogar button");
const quiz_box = document.querySelector(".quiz_box");
const listaOpcoes = document.querySelector(".listaq");
const result_box = document.querySelector(".result_box");
const restart = result_box.querySelector(".restart");
const sair = result_box.querySelector(".sair");
const barra = document.querySelector(".bar");
const barraA = document.querySelector(".dentroBarra");
const box_name = document.querySelector(".box_name");
const nomeUser = box_name.querySelector(".nome_user");
var progresso = 1
var porc = 10;
let pontuacao = 0;
let questaoOrdem = 0;
let numeroquestao = 1;
sair.onclick = () =>{
    progresso = 0
    location.reload();
}
restart.onclick = () => {
    porc = 10;
    progresso = 0
    barra.classList.add("barraAtiva");
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
    box_name.classList.add("userAtivo");
    btn_jogar.classList.add("btnDesativado");
    quiz_box.classList.add("quizAtivo");
    mostrarQuestao(0);
    barra.classList.add("barraAtiva");
    barraA.style.width=(progresso + '%');
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

        barraA.style.width=(progresso + '%');
        barraA.innerHTML=(porc + "%");
    }
    porc += 10;
    progresso += 10;
}
function contadorQuestoes() {

    const contadorQuestao = quiz_box.querySelector(".total_questao");
    let total_questao = '<span> ' + numeroquestao + ' de ' + questoes.length + ' Questões</span>';
    contadorQuestao.innerHTML = total_questao;}

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
    box_name.classList.add(".userAtivo");
    btn_jogar.classList.add("btnDesativado");
    quiz_box.classList.remove("quizAtivo");
    result_box.classList.add("resultAtivo");
    barra.classList.remove("barraAtiva");
    const pontuacaoTexto = result_box.querySelector(".pontuacao");
    if (pontuacao > 3) {
        let pontuacaoTag = 'Você é Genial ' + nomeUser.value + ' Acertou ' + pontuacao +' de 5! Muito Bem 😎!';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    }
    else if (pontuacao > 1) {
        let pontuacaoTag = '<span>Aeee ' + nomeUser.value + ' Acertou '+ pontuacao + ' de 5!</p>Ficou na média!👌</span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    }
    else {
        let pontuacaoTag = 'Que pena ' + nomeUser.value + ', Você só acertou '+ pontuacao +' de 5!</p>😢</span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;

    }
}