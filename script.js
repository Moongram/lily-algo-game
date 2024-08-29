const question = document.getElementById('question');
const options = document.querySelectorAll('.option');
const curScore = document.getElementById('score');
const canvas = document.getElementById('time-bar');
const ctx = canvas.getContext('2d');

const urlParams = new URLSearchParams(window.location.search);
const startGame = urlParams.get('start');
const initialScore = parseInt(urlParams.get('score')) || 0;

let score = initialScore;
let startTime;
let timer;
let questionNumber = 0;

let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
let bestTime = parseFloat(localStorage.getItem('bestTime')) || 10000;
let isBestScore = 0;

function startGameIfNeeded() {
    if (startGame === 'true') {
        generateQuestion();
    }
}

function generateQuestion() {
    questionNumber++;

    let timeLimit;

    if (questionNumber <= 5) {
        timeLimit = 3000;
    } else if (questionNumber <= 10) {
        timeLimit = 2000;
    } else {
        timeLimit = 1000;
    }
    if (questionNumber === 1) {
        startTime = Date.now();
        document.getElementById("best-score-game").textContent = localStorage.getItem("bestScore") || 0
    }

    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    let operator;
    let answer;
    let ran = Math.random();
    if (ran < 0.5) {
        operator = '+'
        answer = num1 + num2;
    } else {
        operator = '-'
        answer = num1 - num2;
    }

    const optionsCandidates = [];
    while (optionsCandidates.length < 3) {
        const option = Math.floor(Math.random() * 20) + 1;
        if (!optionsCandidates.includes(option) && option !== answer) {
            optionsCandidates.push(option);
        }
    }
    optionsCandidates.push(answer);
    optionsCandidates.sort(() => Math.random() - 0.5);

    question.textContent = num1 + " " + operator + " " + num2 + " = ?";

    options.forEach((option, index) => {
        option.textContent = optionsCandidates[index];
        option.onclick = () => verify(parseInt(option.textContent), answer);
    });

    const availableTime = document.getElementById('available-time');
    let ans = timeLimit / 1000;
    availableTime.textContent = ans + " seconds";

    startTimer(timeLimit);
}

function startTimer(timeLimit) {
    canvas.style.display = 'block';

    const interval = 10;
    let timeLeft = timeLimit;

    timer = setInterval(() => {
        const timePassed = timeLimit - timeLeft;

        if (timePassed >= timeLimit) {
            clearInterval(timer);
            gameOver();
        } else {
            const width = (timePassed / timeLimit) * canvas.width;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fb6f92';
            ctx.fillRect(0, 0, width, canvas.height);
            timeLeft -= interval;
        }
    }, interval);
}

function verify(selected, correct) {
    clearInterval(timer);
    if (selected === correct) {
        score++;
        curScore.textContent = score;
        generateQuestion();
    } else {
        gameOver();
    }
}

function gameOver() {
    const currentTime = Date.now();
    const totalTimeSpent = (currentTime - startTime) / 1000;

    if (score > bestScore || (score === bestScore && totalTimeSpent < bestTime)) {
        bestScore = score;
        bestTime = totalTimeSpent;
        isBestScore = 1;
        localStorage.setItem('bestScore', bestScore);
        localStorage.setItem('bestTime', bestTime);
        localStorage.setItem('isBestScore', isBestScore);

    }

    window.location.href = "gameover.html?score=" + score + "&time=" + totalTimeSpent;
}

startGameIfNeeded();
