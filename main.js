const SENTENCE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
               "Donec pellentesque ante ut metus pretium pellentesque. " +
               "Sed quis nunc et nisi consectetur elementum id in ligula. " +
               "Nulla vulputate tristique odio nec tristique. Donec feugiat " +
               "aliquam massa nec vulputate. Donec purus arcu, faucibus a metus " +
               "id, lobortis dignissim lorem. Vivamus et iaculis eros. Cras nec " +
               "nibh in augue vestibulum finibus quis malesuada nisi." + " Donec dapibus, massa sit amet ornare ultrices";

const TIME_LIMIT = 30;

const wordList = document.getElementById("word-list");
const inputField = document.getElementById("input-field");
const resetButton = document.getElementById("reset-button");

let timer = null;
let timeElapsed = 0;
let currentWord = 0;

let wpm = 0;
let accuracy = 0;

let wordsTyped = 0; // correct words typed

let correctChars = 0;
let totalChars = 0;

inputField.addEventListener("keyup", e => {
    let wordArray = wordList.querySelectorAll("span");

    if(currentWord == 0) // when first key is pressed
        startTimer();
    
    if(e.code == 'Space') {
        if(inputField.value == wordArray[currentWord].innerText) {
            wordArray[currentWord].classList.remove("highlight");
            wordArray[currentWord].classList.add("correct");
            correctChars += wordArray[currentWord].innerHTML.length;
            totalChars += wordArray[currentWord].innerHTML.length;
        }

        else if(inputField.value != wordArray[currentWord].innerText) {
            wordArray[currentWord].classList.remove("highlight");
            wordArray[currentWord].classList.add("incorrect");
            totalChars += wordArray[currentWord].innerHTML.length;
        }

        wordsTyped++;

        inputField.value = null;
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
    inputField.setAttribute('disabled',"");
    accuracy = Math.round(correctChars / totalChars * 10) / 10;
    wpm = (wordsTyped / TIME_LIMIT) * 60;
    updateResults();
}

function updateResults() {
    document.getElementById("wpm").innerHTML = wpm;
    document.getElementById("accuracy").innerHTML = accuracy * 100 + "%";
}

function reset() {
    if(inputField.hasAttribute("disabled"))
        inputField.removeAttribute("disabled");
    
    currentWord = 0;
    timeElapsed = 0;
    wordsTyped = 0;
    inputField.value = null;
    clearInterval(timer);

    unloadText();
    loadText();
}

function unloadText() {
    let child = wordList.lastElementChild;
    while(child) {
        wordList.removeChild(child);
        child = wordList.lastElementChild;
    }
}

function loadText() {
    SENTENCE.split(' ').forEach(word => {
        let wordSpan = document.createElement('span');
        wordSpan.innerText = word + ' ';
        wordList.appendChild(wordSpan);
    });
    wordList.firstChild.classList.add("highlight");
}