function corrigirProva() {

    const predefinedUserAnswers = { // resposta da canditada 
        Portuguese: ['A', 'A', 'C', 'C', 'B', 'A', 'A', 'C', 'C', 'B'],
        Logic: ['D', 'A', 'C', 'D', 'D', 'D', 'B', 'D', 'D', 'B'],
        Computing: ['D', 'A', 'A', 'D', 'A', 'C', 'D', 'B', 'B', 'B'],
        Legislation: ['C', 'B', 'A', 'B', 'D', 'D', 'B', 'D', 'B', 'A', 'D', 'A', 'A', 'C', 'B'],
        Specific: ['B', 'A', 'D', 'B', 'A', 'C', 'A', 'A', 'C', 'D', 'B', 'B', 'B', 'C', 'D'],
    };

    // Função para limpar e padronizar as respostas
    function processAnswers(answerString) {
        return answerString
            .trim() // Remove espaços no início e no final
            .split(',') // Separa as respostas por vírgula
            .map(answer => answer.trim().toUpperCase()); // Remove espaços internos e converte para maiúsculas
    }

    const subjects = [
        {
            name: 'Português',
            correct: processAnswers(document.getElementById('correctAnswersPortuguese').value), // valor de acordo com o gabarito
            user: predefinedUserAnswers.Portuguese // resposta da candidata 
        },
        {
            name: 'Raciocínio',
            correct: processAnswers(document.getElementById('correctAnswersLogic').value),
            user: predefinedUserAnswers.Logic
        },
        {
            name: 'Legislação',
            correct: processAnswers(document.getElementById('correctAnswersLegislation').value),
            user: predefinedUserAnswers.Legislation
        },
        {
            name: 'Específicos',
            correct: processAnswers(document.getElementById('correctAnswersSpecific').value),
            user: predefinedUserAnswers.Specific
        },
        {
            name: 'Informática',
            correct: processAnswers(document.getElementById('correctAnswersComputing').value),
            user: predefinedUserAnswers.Computing
        }
    ];

    let totalScore = 0;
    let totalQuestions = 0;
    let resultMessage = '';

    // itera sobre as materias no array subjects
    subjects.forEach(subject => {
        let score = 0; // inicicia a pontuação zerada

        // Percorre as respostas corretas e as respostas da candidata ao mesmo tempo
        subject.correct.forEach((answer, index) => {
            // Compara a resposta correta com a resposta da candidata na mesma posição
            if (answer === subject.user[index]) {
                score++; // Se a resposta for igual, incrementa a pontuação
            }
        });

        // Atualiza a pontuação total somando os pontos desta matéria
        totalScore += score;

        // Atualiza o número total de questões somando o total de questões desta matéria
        totalQuestions += subject.correct.length;

        // Adiciona uma mensagem de resultado formatada para a matéria atual
        resultMessage += `<p>${subject.name}: Você acertou <span>${score}</span> de <span>${subject.correct.length}</span> questões.</p>`;
    });

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = resultMessage + `<p>Total: Você acertou <span>${totalScore}</span> de <span>${totalQuestions}</span> questões.</p>`;
}