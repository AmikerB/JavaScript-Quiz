///////// HTML SELECTING ////////// 
// buttons
let start = document.querySelector("#start");
let submit = document.querySelector("#submit");

// inputs
let initialsInput = document.querySelector("#initials");

// screens
let startScreen = document.querySelector("#start-screen");
let questionScreen = document.querySelector("#questions");
let endScreen = document.querySelector("#end-screen");

// question elements 
let questionTitleElement = document.querySelector("#question-title");
let choicesElement = document.querySelector("#choices");



///////// CLOCK LOGIC //////////
let interval;
let time = document.querySelector("#time");

// starting clock at 60 (seconds which I have set in a function)
let startTime = 60;

// question number starts at -1, there isn't a -1 in an array therfore, no questions are being displayed... yet
let questionNumber = -1;

// storage of score
let score = 0;

// SFX files
let correctSfx = new Audio("assets/sfx/correct.wav");
let incorrectSfx = new Audio("assets/sfx/incorrect.wav");

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        let temp = array[currentIndex];

        array[currentIndex] = array[randomIndex];

        array[randomIndex] = temp;

    }

    return array;
}

let shuffledQuestions = shuffle(choices);

// function to display the current time on the webpage
function getDisplayTime() {
    return Number(time.textContent);
}

//function to set the time to a number and display it to the webpage
function setDisplayTime(newTime) {
    time.textContent = newTime;
}

// function to decrease the time by a set amount
function decreaseTime(value) {
    let currentTime = getDisplayTime();
    let newValue = currentTime - value;

    if (newValue <= 0) {
        clearInterval(interval);
        setDisplayTime("Time is up!");
        gameOver();
    } else {
        setDisplayTime(newValue);
    }
}

// function which decreases the current time by 1
function decreaseTimeByOne() {
    decreaseTime(1);
}


///////// QUESTION LOGIC //////////


function removeMessages() {
    let messageElements = document.querySelectorAll(".message");

    messageElements.forEach(function (element) {
        element.remove();
    });
}


// wrong answer message
function wrongAnswerMessageInterval() {
    removeMessages();
    // display the message
    let wrongAnswerMessage = document.createElement("p");
    wrongAnswerMessage.textContent = "Wrong!";
    wrongAnswerMessage.classList.add("message", "wrong");
    choicesElement.appendChild(wrongAnswerMessage);

    // message disappears after 2 seconds  
    setTimeout(function () {
        wrongAnswerMessage.style.display = "none";
    }, 2000);
}

// checks if answer selected macthes the correct answer for that question index
function isTheAnswerCorrect() {

    let optionButtons = document.querySelectorAll(".option-button");


    optionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            let currentQuestion = choices[questionNumber];

            if (this.textContent === currentQuestion.correctAnswer) {

                correctSfx.play();

                score++;

                // hides the current choices before moving onto the next question 
                optionButtons.forEach(function (choices) {
                    choices.style.display = "none";
                });

                // move to next question:
                showNextQuestion();
            } else {
                incorrectSfx.play();

                wrongAnswerMessageInterval();
                // take 10 secs off time.
                decreaseTime(10);
                score--;
            }
        })
    })
}

// call this when you want to display the next question
function showNextQuestion() {

    removeMessages();

    //when called adds 1 to the index which in turn goes to the next question
    questionNumber += 1;

    let questionTitle = shuffledQuestions[questionNumber].questionTitles;

    // displays the question title on the webpage 
    questionTitleElement.textContent = questionTitle;

    // shows the next choices as buttons
    let choice = shuffledQuestions[questionNumber];

    // creates choices buttons and displays the choices on the webpage 
    shuffle(choice.options).forEach(function (item) {
        let optionButton = document.createElement("button");
        optionButton.textContent = item;
        optionButton.classList.add("option-button");
        choicesElement.appendChild(optionButton);
    });
    // runs other function to check if correct answer was selected
    isTheAnswerCorrect();
}


// FUNCTION NOT RAN ANYWHERE YET
function gameOver() {
    questionScreen.classList.add("hide");

    endScreen.classList.remove("hide");
}



///////// START THE GAME LOGIC //////////

start.addEventListener("click", function (event) {
    event.preventDefault();

    setDisplayTime(startTime);
    // decrease time by 1 every second
    interval = setInterval(decreaseTimeByOne, 1000);
    // hide the start screen 
    startScreen.classList.add("hide");
    // removes the class hide from the question screen to display the question screen
    questionScreen.classList.remove("hide");

    showNextQuestion();
})

submit.addEventListener("click", function (event) {
    if (initialsInput.value === "") {
        return;
    }
    let scoresString = localStorage.getItem("scores");
    let scores;

    if (scoresString === null) {
        scores = [];
    } else {
        scores = JSON.parse(scoresString);
    }

    let scoreObject = {
        initials: initialsInput.value,
        score: score
    };

    scores.push(scoreObject);

    localStorage.setItem("scores", JSON.stringify(scores));

    endScreen.classList.add("hide");

    startScreen.classList.remove("hide");

    initialsInput.value = "";

    score = 0;

});

///////// TO DO /////////

// LOCAL STORAGE
// when on highscores page display local storage scores in order from highest score to lowest score. only show top 5 scores 
//  