///////// HTML SELECTING ////////// 

let highscoresElement = document.querySelector("#highscores");
let clear = document.querySelector("#clear");

let highscores = [];

///////// LOCAL STORAGE //////////

// check local storage at start of game
function getScores() {
    let storedScores = localStorage.getItem("scores")
    // if no stored scores, dont return anything
    if (storedScores === null) {
        return;
    } else {
        // if stored scores convert to an object
        highscores = JSON.parse(storedScores);
        // sort scores from largest number to smallest
        highscores.sort(function (a, b) {
            return b.score - a.score;
        })
    }
    // top 5 scores
    highscores.forEach(function (scoreObject, index) {
        if (index > 4) {
            return;
        }
        // list scores
        let listElement = document.createElement("li");
        listElement.textContent = scoreObject.initials + " " + scoreObject.score;
        highscoresElement.appendChild(listElement);
    })
}


// clear high scores button
clear.addEventListener("click", function () {
    localStorage.clear();
    highscoresElement.innerHTML = "";
})

// check storage for scores
getScores();