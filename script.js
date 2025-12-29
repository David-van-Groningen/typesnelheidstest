const startButton = document.getElementById('start-btn');
const inputField = document.getElementById('input-field');
const timerDisplay = document.getElementById('timer');
const wordDisplay = document.getElementById('word-display');
const resultsDisplay = document.getElementById('results');
const wordsCountDisplay = document.getElementById('words-count');
const charactersPerMinuteDisplay = document.getElementById('characters-per-minute');

let timer;
let timeLeft = 60;
let wordCount = 0;
let characterCount = 0;
let currentWord = '';

async function getWord() {
    const response = await fetch("https://random-word-bit.vercel.app/word");
    const word = await response.json();
    return word[0].word.toLowerCase();
}


function endTest() {
    clearInterval(timer);
    inputField.disabled = true;
    wordDisplay.textContent = "Test is afgelopen!";
    wordsCountDisplay.textContent = `Aantal woorden: ${wordCount}`;
    charactersPerMinuteDisplay.textContent = `Karakter per minuut: ${characterCount}`;
    resultsDisplay.classList.remove('hidden');
}

function startTimer() {
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) endTest();
    }, 1000);
}

async function startTest() {
    startButton.disabled = true;
    inputField.disabled = false;
    inputField.value = '';
    resultsDisplay.classList.add('hidden');

    wordCount = 0;
    characterCount = 0;
    timeLeft = 60;

    currentWord = await getWord();
    wordDisplay.textContent = currentWord;

    startTimer();
}

async function handleInput() {
    const typed = inputField.value.trim().toLowerCase();
    if (typed === currentWord) {
        wordCount++;
        characterCount += typed.length;
        inputField.value = '';
        currentWord = await getWord();
        wordDisplay.textContent = currentWord;
    }
}

startButton.addEventListener('click', startTest);
inputField.addEventListener('input', handleInput);
