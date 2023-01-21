// store in the local storage 
let highscoresElement = document.querySelector("#highscores");

let highscores = [];


///////// look into local storage //////////
function init() {
    getScores();
}

// check local storage at start of game
function getScores() {
    let storedScores = localStorage.getItem("scores")
    if (storedScores === null) {
        return;
    } else {
        highscores = JSON.parse(storedScores);
        highscores.sort(function (a, b) {
            return b.score - a.score;
        })
    }
    highscores.forEach(function (scoreObject, index) {
        if (index > 4) {
            return;
        }
        let listElement = document.createElement("li");
        listElement.textContent = scoreObject.initials + " " + scoreObject.score;
        highscoresElement.appendChild(listElement);
    })
}

// cleared localStorage.clear 
// clear list 

// check storage for scores
init();