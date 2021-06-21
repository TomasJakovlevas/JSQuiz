// Variables
// DOM Elements
const startBtnElement = document.querySelector('#start-btn');
const nextBtnElement = document.querySelector('#next-btn');

const quizQusetionElement = document.querySelector('#quiz__questions');
const questionElement = document.querySelector('#qusetion');
const answersBtnElement = document.querySelector('#answers-btns');
const resultElement = document.querySelector('#result');

// logic
let question = [];
let index;
let score = 0;

// -- fetching data(questions from data folder to questions array)
fetch('../data/HTML_questions.json')
.then((response) => response.json())
.then((data) => question.push(...data));

// Functions

// -- starting game(after pressing 'START QUIZ')
const startQuiz = () => {
    startBtnElement.classList.add('hide');
    quizQusetionElement.classList.remove('hide');

    // reseting score and index
    if(!resultElement.classList.contains('hide')) {
        resultElement.classList.add('hide');
        score = 0;
    }

    index = 0;
    setNextQuestion();

}

// -- reseting "NEXT QUESTION" button and setting new question
const setNextQuestion = () => {
    resetState();

    showQuestion(question[index]);
}

// -- selecting answer (by clicking on its button)
const selectAnswer = (e) => {
    let correct = e.target.dataset.correct;

    if(correct) {
        e.target.classList.add('correct');
        e.target.innerHTML += ` <i class="fas fa-check-circle"></i>`;
        score++;
    } else {
        e.target.classList.add('wrong');
        e.target.innerHTML += ` <i class="fas fa-times-circle"></i>`;
    }

    Array.from(answersBtnElement.children).forEach(
        (btn) => (btn.disabled = true)
    );

    if(question.length > index + 1) {
        nextBtnElement.classList.remove('hide');
    } else {
        startBtnElement.innerText = 'RESTART QUIZ';
        startBtnElement.classList.remove('hide');

        resultElement.classList.remove('hide');
        resultElement.innerText = `Your score is: ${score}/${question.length}`;
    }

    if(score == question.length) resultElement.innerText += `\nYOU ARE A CHAMP!`
};

// -- showing question and answer from qusetion array
const showQuestion = (question) => {
    questionElement.innerText = question.question;

    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'btn-html');

        if(answer.correct) button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);

        answersBtnElement.appendChild(button);
    });
    
}

// -- showing next question(after clicking 'NEXT QUESTION')
const showNextQuestion = () => {
    index++;
    setNextQuestion();
};

// reseting 'NEXT QUESTION' button and answers
const resetState = () => {
    nextBtnElement.classList.add('hide');

    while(answersBtnElement.firstChild) {
        answersBtnElement.removeChild(answersBtnElement.firstChild);
    }
};

// Events
document.addEventListener('DOMContentLoaded', () => {
    startBtnElement.style.backgroundColor = 'var(--html-color)';
})

startBtnElement.addEventListener('click', startQuiz);
nextBtnElement.addEventListener('click', showNextQuestion);