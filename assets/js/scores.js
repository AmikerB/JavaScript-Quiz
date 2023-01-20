///////// look into local storage //////////
function init() {
    getScores();
}

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