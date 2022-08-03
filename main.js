const SENTENCE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
               "Donec pellentesque ante ut metus pretium pellentesque. " +
               "Sed quis nunc et nisi consectetur elementum id in ligula. " +
               "Nulla vulputate tristique odio nec tristique. Donec feugiat " +
               "aliquam massa nec vulputate. Donec purus arcu, faucibus a metus " +
               "id, lobortis dignissim lorem. Vivamus et iaculis eros. Cras nec " +
               "nibh in augue vestibulum finibus quis malesuada nisi.";

const TIME_LIMIT = 60;

const wordList = document.getElementById("word-list");
const inputField = document.getElementById("input-field");
const resetButton = document.getElementById("reset-button");

let timer = null;
let timeElapsed = 0;
let currentWord = 0;

let wpm = 0;
let accuracy = 0;

let wordsTyped = 0;
let correctChars = 0;
let incorrectChars = 0;

inputField.addEventListener("keyup", e => {
    let wordArray = wordList.querySelectorAll("span");

    if(currentWord == 0) // when first key is pressed
        startTimer();
    
    if(e.code == 'Space') {
        console.log(inputField.value);
        console.log(wordArray[currentWord].innerText);

        if(inputField.value == wordArray[currentWord].innerText) {
            wordArray[currentWord].classList.remove("highlight");
            wordArray[currentWord].classList.add("correct");
        }

        else if(inputField.value != wordArray[currentWord].innerText) {
            wordArray[currentWord].classList.remove("highlight");
            wordArray[currentWord].classList.add("incorrect");
        }

        inputField.value = '';
        currentWord++;

        wordArray[currentWord].classList.add("highlight");
    }
}); 

function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if(timeElapsed < TIME_LIMIT) timeElapsed++;
    else calculateResults();
}

function calculateResults() {
    inputField.removeEventListener("keydown");
    updateResults();
}

function updateResults() {
    document.getElementById("wpm").innerHTML = wpm;
    document.getElementById("accuracy").innerHTML = accuracy + "%";
}

function reset() {
    inputField.value = null;
    clearInterval(timer);
}

function loadText() {
    SENTENCE.split(' ').forEach(word => {
        let wordSpan = document.createElement('span');
        wordSpan.innerText = word + ' ';
        wordList.appendChild(wordSpan);
    });
    wordList.firstChild.classList.add("highlight");
}