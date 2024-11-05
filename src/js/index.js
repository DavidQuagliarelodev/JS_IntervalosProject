const notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const equivalentes = {
    "C#": "Db", "D#": "Eb", "F#": "Gb", "G#": "Ab", "A#": "Bb"
};

const intervalos = [
    "2ªm", "2ªM", "3ªm", "3ªM",
    "4ªJ", "5ªDim", "5ªJ", "5ªAum",
    "6ªm", "6ªM", "7ªm", "7ªM"
];
const semitons = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11]; // Semitons para cada intervalo

const combinacoes = [];
const answers = [];

// Gerando perguntas e respostas
notas.forEach((nota, notaIndex) => {
    intervalos.forEach((intervalo, intervaloIndex) => {
        combinacoes.push(`${intervalo} de ${nota}`);
        
        // Calcula a resposta correta
        const respostaIndex = (notaIndex + semitons[intervaloIndex]) % 12;
        const respostaNota = notas[respostaIndex];
        
        // Adiciona a nota principal e sua enarmonia (se existir)
        const respostaAlternativas = [respostaNota];
        if (equivalentes[respostaNota]) {
            respostaAlternativas.push(equivalentes[respostaNota]);
        }
        
        answers.push(respostaAlternativas);
    });
});

const questHtml = document.getElementById("quest");
let norepited = null;
let questionResult = null;

const nextQuestionBtn = document.getElementById("nextQuestion");
nextQuestionBtn.addEventListener("click", () => {
    let sortNumber = Math.floor(Math.random() * combinacoes.length);

    // Evita repetir a mesma pergunta
    while (sortNumber === norepited) {
        sortNumber = Math.floor(Math.random() * combinacoes.length);
    }

    questHtml.innerHTML = combinacoes[sortNumber];
    questionResult = sortNumber;
    norepited = sortNumber;
});

const sendAnswerBtn = document.getElementById("sendAnswerBtn");
sendAnswerBtn.addEventListener("click", () => {
    const answerInput = document.getElementById("answerInput").value.trim();
    
    if (questionResult != null) {
        if (answers[questionResult].includes(answerInput)) {
            window.alert("Certo");
        } else {
            window.alert(`Errado! A resposta correta é ${answers[questionResult].join(" ou ")}`);
        }
    }
});