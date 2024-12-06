const questions = [
    {
        question: "O que é o aquecimento global?",
        options: [
            "A diminuição da temperatura média do planeta",
            "O aumento da temperatura média do planeta",
            "Um fenômeno causado pela falta de chuvas",
            "O aumento da camada de ozônio"
        ],
        correct: 1,
        image: "Imagens/okarun.gif"
    },
    {
        question: "Quais gases são citados como os principais responsáveis pelo aquecimento global?",
        options: [
            "Dióxido de carbono e metano",
            "Hidrogênio e ozônio",
            "Argônio e monóxido de carbono",
            "Oxigênio e dióxido de enxofre"
        ],
        correct: 0,
        image: "Imagens/anime-chibi.gif"
    },
    {
        question: "Qual atividade humana contribui para o aquecimento global?",
        options: [
            "Uso de energia solar",
            "Plantação de árvores",
            "Queima de combustíveis fósseis",
            "Construção de casas"
        ],
        correct: 2,
        image: "Imagens/anime-thinking.gif"
    },
    {
        question: "Qual das alternativas é uma consequência do aquecimento global?",
        options: [
            "Aumento de furacões e secas",
            "Diminuição do nível do mar",
            "Melhoria na biodiversidade",
            "Redução dos eventos climáticos extremos"
        ],
        correct: 0,
        image: "Imagens/kilua.gif"
    },
    {
        question: "Como o aquecimento global afeta as calotas polares?",
        options: [
            "Provoca o aumento de sua espessura",
            "Faz com que congelem mais rapidamente",
            "Causa o derretimento das calotas polares",
            "Não afeta as calotas polares"
        ],
        correct: 2,
        image: "Imagens/pensando.gif"
    },
    {
        question: "Como as comunidades humanas são impactadas pelo aquecimento global?",
        options: [
            "Maior disponibilidade de recursos naturais",
            "Deslocamento devido a desastres naturais",
            "Aumento da segurança alimentar",
            "Menor risco de desastres climáticos"
        ],
        correct: 1,
        image: "Imagens/luffy.gif"
    },
    {
        question: "Qual medida sustentável foi citada para combater o aquecimento global?",
        options: [
            "Expansão do desmatamento",
            "Redução das energias renováveis",
            "Uso de combustíveis fósseis",
            "Incentivo ao transporte coletivo"
        ],
        correct: 3,
        image: "Imagens/gon.gif"
    },
    {
        question: "Por que as energias renováveis são importantes no combate ao aquecimento global?",
        options: [
            "Porque emitem menos gases de efeito estufa",
            "Porque aumentam a produção de energia fóssil",
            "Porque são baratas",
            "Porque não precisam de manutenção"
        ],
        correct: 0,
        image: "Imagens/pensando 02.gif"
    },
    {
        question: "Qual é uma das formas de conscientizar a população sobre o aquecimento global?",
        options: [
            "Reduzir o acesso à informação sobre o tema",
            "Divulgar informações sobre a crise ambiental",
            "Aumentar o desmatamento nas florestas",
            "Incentivar o uso de combustíveis fósseis"
        ],
        correct: 1,
        image: "Imagens/anime-blank-eyes.gif"
    },
    {
        question: "O que pode acontecer se o aquecimento global continuar sem controle?",
        options: [
            "Redução do nível do mar",
            "Maior frequência de desastres naturais",
            "Melhoria no clima mundial",
            "Aumento da biodiversidade"
        ],
        correct: 1,
        image: "Imagens/ichigo.gif"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const modal = new bootstrap.Modal(document.getElementById("feedbackModal"));
const modalTitle = document.getElementById("feedbackModalLabel");
const modalBody = document.querySelector("#feedbackModal .modal-body");
const nextQuestionButton = document.getElementById("next-question");

// Função para carregar uma nova pergunta
function loadQuestion() {
    // Recuperar a questão atual
    const currentQuestion = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
      <div class="fade-in mb-4">
        <h5>${currentQuestionIndex + 1}. ${currentQuestion.question}</h5>
        <img src="${currentQuestion.image}" alt="Imagem ilustrativa" class="question-image">
        ${currentQuestion.options
            .map(
                (option, i) => `
          <div class="form-check">
            <input class="form-check-input" type="radio" name="question" id="option${i}" value="${i}">
            <label class="form-check-label" for="option${i}">
              <strong>${String.fromCharCode(65 + i)}.</strong> ${option}
            </label>
          </div>
        `
            )
            .join("")}
        <button class="btn btn-primary mt-3" id="submit-answer">Enviar Resposta</button>
      </div>
    `;

    // Adicionar o evento de envio da resposta
    document
        .getElementById("submit-answer")
        .addEventListener("click", checkAnswer);
}

// Função para verificar a resposta
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="question"]:checked');

    if (!selectedOption) {
        alert("Por favor, selecione uma resposta!");
        return;
    }

    const answer = parseInt(selectedOption.value);
    const isCorrect = answer === questions[currentQuestionIndex].correct;

    const options = document.querySelectorAll(".form-check-input");
    options.forEach((option, i) => {
        const label = option.nextElementSibling;
        if (i === questions[currentQuestionIndex].correct) {
            label.style.color = "green";
        } else if (i === answer) {
            label.style.color = "red";
        }
        option.disabled = true;
    });

    showFeedback(isCorrect);
}

// Função para exibir feedback após a resposta
function showFeedback(isCorrect) {
    const modalHeader = document.querySelector(".modal-header");
    modalHeader.classList.remove("success", "error");
    if (isCorrect) {
        modalHeader.classList.add("success");
    } else {
        modalHeader.classList.add("error");
    }

    modalTitle.textContent = isCorrect
        ? "Você acertou! 🎉"
        : "Você errou! 😢";

    modalBody.textContent = isCorrect
        ? "Parabéns, você acertou essa pergunta!"
        : `A resposta correta era: ${String.fromCharCode(65 + questions[currentQuestionIndex].correct)
        }. ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].correct]
        }.`;

    if (isCorrect) score++;

    modal.show();

    nextQuestionButton.style.display = "block"; // Mostrar o botão de próxima pergunta
}

// Função para avançar para a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextQuestionButton.style.display = "none"; // Esconde o botão de próxima pergunta
    } else {
        showFinalScore();
    }
}

// Função para exibir a pontuação final
function showFinalScore() {
    quizContainer.innerHTML = `
      <div class="final-score">
        <h2>Fim do Quiz!</h2>
        <p>Sua pontuação final é: ${score} de ${questions.length}</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/zQxeSeJjCyg?si=rSDZiJt6IAHZHC64" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `;
}


nextQuestionButton.addEventListener("click", nextQuestion);

// Iniciar o quiz
loadQuestion();
