const startButton = document.getElementById('start-btn');
const inputField = document.getElementById('input-field');
const timerDisplay = document.getElementById('timer');
const wordDisplay = document.getElementById('word-display');
const resultsDisplay = document.getElementById('results');
const wordsCountDisplay = document.getElementById('words-count');
const charactersPerMinuteDisplay = document.getElementById('characters-per-minute');
const difficultySelect = document.getElementById('difficulty');
const themeToggle = document.getElementById('theme-toggle');

let timer;
let timeLeft = 60;
let correctWords = 0;
let errorCount = 0;
let characterCount = 0;
let totalAttempts = 0;
let currentWord = '';
let difficulty = 'normal';

/* Thema */

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light");
        themeToggle.textContent = "🌙 Purple mode";
    }
}
loadTheme();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeToggle.textContent = isLight ? "🟪 Blue mode" : "☀️ Light mode";
    localStorage.setItem("theme", isLight ? "light" : "purple");
});

/* Woorden */

async function getWord() {
    let word = "";

    while (true) {
        const response = await fetch("https://random-word-bit.vercel.app/word");
        const data = await response.json();
        word = data[0].word.toLowerCase();

        if (difficulty === "easy" && word.length <= 5) break;
        if (difficulty === "normal" && word.length >= 5 && word.length <= 8) break;
        if (difficulty === "hard" && word.length >= 8) break;
    }

    return word;
}

/* Timer */

function startTimer() {
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) endTest();
    }, 1000);
}

/* Game logica*/

async function startTest() {
    difficulty = difficultySelect.value;
    timeLeft = difficulty === "hard" ? 45 : 60;

    startButton.disabled = true;
    inputField.disabled = false;
    inputField.value = '';
    inputField.focus();

    correctWords = 0;
    errorCount = 0;
    characterCount = 0;
    totalAttempts = 0;

    resultsDisplay.classList.add('hidden');

    currentWord = await getWord();
    wordDisplay.textContent = currentWord;
    wordDisplay.style.color = "";

    startTimer();
}

async function handleInput(e) {
    if (e.key !== " " && e.key !== "Enter") return;

    const typed = inputField.value.trim().toLowerCase();
    if (!typed) return;

    totalAttempts++;

    if (typed === currentWord) {
        correctWords++;
        characterCount += typed.length;
        wordDisplay.style.color = "#00ff99";
    } else {
        errorCount++;
        wordDisplay.style.color = "#ff4d4d";
    }

    inputField.value = '';

    setTimeout(async () => {
        wordDisplay.style.color = "";
        currentWord = await getWord();
        wordDisplay.textContent = currentWord;
    }, 200);
}

function endTest() {
    clearInterval(timer);
    inputField.disabled = true;
    startButton.disabled = false;

    const wpm = Math.round(characterCount / 5);
    const accuracy = totalAttempts
        ? Math.round((correctWords / totalAttempts) * 100)
        : 0;

    wordDisplay.textContent = "Test afgelopen!";
    wordsCountDisplay.textContent = `Correcte woorden: ${correctWords}`;
    charactersPerMinuteDisplay.textContent =
        `WPM: ${wpm} | Accuracy: ${accuracy}% | Fouten: ${errorCount}`;

    resultsDisplay.classList.remove('hidden');
}

/* Events */

startButton.addEventListener('click', startTest);
inputField.addEventListener('keydown', handleInput);
