// store in the local storage 
















///////// look into local storage //////////
function init() {
    getScores();
}

// check local storage at start of game
function getScores() {
    let storedScores = localStorage.getItem("highscores")
    if (storedScores === null) {
        return;
    } else {
        highscores = storedScores;
    }
    highscores.textContent = highscores;
}

// check storage for scores
init();