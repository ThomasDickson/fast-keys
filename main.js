const dictionary = ["is", "was", "are", "be", "have","had", "were", "can", "said", "use","do", "will", "would", "make", "like","has", "look", "write", "go", "see","could", "been", "call", "am", "find","did", "get", "come", "made", "may","take", "know", "live", "give", "think","say", "help", "tell", "follow", "came","want", "show", "set", "put", "does","must", "ask", "went", "read", "need","move", "try", "change", "play", "spell","found", "study", "learn", "should", "add","keep", "start", "thought", "saw", "turn","might", "close", "seem", "open", "begin","got", "run", "walk", "began", "grow","took", "carry", "hear", "stop", "miss","eat", "watch", "let", "cut", "talk","being", "leave", "word", "time", "number", "way", "people","water", "day", "part", "sound", "work","place", "year", "back", "thing", "name","sentence", "man", "line", "boy", "farm","end", "men", "land", "home", "hand","picture", "air", "animal", "house", "page","letter", "point", "mother", "answer", "America","world", "food", "country", "plant", "school", "father", "tree", "city", "earth", "eye", "head", "story", "example", "life", "paper","group", "children", "side", "feet", "car","mile", "night", "sea", "river", "state","book", "idea", "face", "Indian", "girl","mountain", "list", "song", "family","he", "a", "one", "all", "an","each", "other", "many", "some", "two","more", "long", "new", "little", "most","good", "great", "right", "mean", "old","any", "same", "three", "small", "another","large", "big", "even", "such", "different","kind", "still", "high", "every", "own","light", "left", "few", "next", "hard","both", "important", "white", "four", "second","enough", "above", "young", "of", "to", "in", "for", "on","with", "at", "from", "by", "about","into", "down", "over", "after", "through","between", "under", "along", "until", "without","you", "that", "it", "he", "his","they", "I", "this", "what", "we","your", "which", "she", "their", "them","these", "her", "him", "my", "who","its", "me", "our", "us", "something","those", "and", "as", "or", "but","if", "than", "because", "while", "it's", "don't"]

const TIME_LIMIT = 30;

const wordList = document.getElementById("word-list");
const inputField = document.getElementById("input-field");
const resetButton = document.getElementById("reset-button");

let words = [];

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

function getRandomWord() {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
}

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
    wpm = wordsTyped / (TIME_LIMIT / 60);
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
    words = [];
}

function loadText() {
    for(var i = 0; i < 100; i++)
    {
        console.log(getRandomWord())
        words.push(getRandomWord());
        let wordSpan = document.createElement('span');
        wordSpan.innerText = words[i] + ' ';
        wordList.appendChild(wordSpan);
    }
    
    wordList.firstChild.classList.add("highlight");
}
