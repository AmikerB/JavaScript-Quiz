///////// HTML SELECTING ////////// 

// buttons
let start = document.querySelector("#start");
let submit = document.querySelector("#submit");

// inputs
let initialsInput = document.querySelector("#initials");

//final score
let finalScore = document.querySelector("#final-score");

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
let startTime = 60;
// question number starts at -1, there isn't a -1 in an array therfore, no questions are being displayed yet
let questionNumber = -1;
let score = 0;

// SFX files
let correctSfx = new Audio("assets/sfx/correct.wav");
let incorrectSfx = new Audio("assets/sfx/incorrect.wav");

// function to shuffle
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

// shuffles questions and stores in an array
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
    // once timer reaches 0 game is over
    if (newValue <= 0) {
        clearInterval(interval);
        setDisplayTime("Time is up!");
        gameOver();
    } else {
        // timer displays new time 
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
    // converts each option into a button
    optionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            let currentQuestion = choices[questionNumber];
            // checks if answer selected is the correct answer
            if (this.textContent === currentQuestion.correctAnswer) {
                correctSfx.play();
                score++;
                // hides the current choices before moving onto the next question 
                optionButtons.forEach(function (choices) {
                    choices.style.display = "none";
                });
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
    // removes messages before next question is displayed
    removeMessages();


    // end game once last question answered 
    shuffledQuestions.forEach(function (choices, index) {
        if (index > choices.length) {
            gameOver();
        }
    })


    //when called adds 1 to the index which in turn goes to the next question
    questionNumber += 1;
    // shuffles questions then displays a question title on the webpage
    let questionTitle = shuffledQuestions[questionNumber].questionTitles;
    questionTitleElement.textContent = questionTitle;
    // displays corresponding options 
    let choice = shuffledQuestions[questionNumber];
    // creates choices buttons and displays the choices on the webpage 
    shuffle(choice.options).forEach(function (item) {
        let optionButton = document.createElement("button");
        optionButton.textContent = item;
        optionButton.classList.add("option-button");
        choicesElement.appendChild(optionButton);
    });
    // runs function to check if correct answer was selected
    isTheAnswerCorrect();
}

///////// END GAME LOGIC //////////

function gameOver() {
    questionScreen.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScore.textContent = score;
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
    // if no initials entered score is not saved
    if (initialsInput.value === "") {
        return;
    }

    let scoresString = localStorage.getItem("scores");
    let scores;

    // if no data in local storage a new string of scores is created
    if (scoresString === null) {
        scores = [];
    } else {
        // converts in local storage into an array with objects
        scores = JSON.parse(scoresString);
    }

    let scoreObject = {
        initials: initialsInput.value.toUpperCase(),
        score: score
    };

    scores.push(scoreObject);
    // converts score inot string to be stored in local storage
    localStorage.setItem("scores", JSON.stringify(scores));
    endScreen.classList.add("hide");
    startScreen.classList.remove("hide");
    // sets initial input box back to empty for next player
    initialsInput.value = "";
    // sets score back to 0 for next player
    score = 0;
});