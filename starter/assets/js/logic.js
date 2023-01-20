// select in html 
// buttons
let start = document.querySelector("#start");
let submit = document.querySelector("#submit");

// screens
let startScreen = document.querySelector("#start-screen");
let questionScreen = document.querySelector("#questions");

// question elements 
let questionTitleElement = document.querySelector("#question-title");
let choicesElement = document.querySelector("#choices");

//clock
let time = document.querySelector("#time");

// starting clock at 60 (seconds which I have set in a function)
let startTime = 60;

// questions
let questionTitles = ["String values must be enclosed within ___ when being assigned to variables.", "Q2", "Q3", "Q4"];

// choices
let choices = [
    {
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "quotes"
    },
    {
        options: ["B1", "B2", "B3"],
        correctAnswer: "B2"
    },
    {
        options: ["C1", "C2", "C3"],
        correctAnswer: "C1"
    },
    {
        options: ["D1", "D2", "D3"],
        correctAnswer: "D1"
    }

]

// question number starts at -1, there isnt a -1 in an array therfore no questions are being displayed
let questionNumber = -1;

// function to display the current time on the webpage
function getDisplayTime() {
    return Number(time.textContent);
}

//function to set the time to a number and display it to the webpage
function setDisplayTime(newTime) {
    time.textContent = newTime;
}

// function to decrease the time by a set amount. This function should be used later when user chooses wrong answer
function decreaseTime(value) {
    let currentTime = getDisplayTime();
    let newValue = currentTime - value;
    setDisplayTime(newValue);
}

// function which decreases the current time by 1
function decreaseTimeByOne() {
    decreaseTime(1);
}

function showNextChoices() {

    let choice = choices[questionNumber];
    // creates choices buttons and displays the choices on the webpage 
    choice.options.forEach(function (item) {
        let optionButton = document.createElement("button");
        optionButton.textContent = item;
        optionButton.classList.add("option-button");
        choicesElement.appendChild(optionButton);
    });

    let optionButtons = document.querySelectorAll(".option-button");
    optionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (this.textContent === choices.correctAnswer) {
                // console.log to see if code works 
                console.log("correct");
                function
                    // add timed message for 3 seconds 
                    correctAnswerMessageInterval() {
                    let correctAnswerMessage = document.createElement("p");
                    correctAnswerMessage.textContent = "Correct!";
                    correctAnswerMessage.classList.add("message", "correct");
                    choicesElement.appendChild(correctAnswerMessage);
                }

                setInterval(correctAnswerMessageInterval, 3000);
            } else {
                console.log("wrong");
                let wrongAnswerMessage = document.createElement("p");
                wrongAnswerMessage.textContent = "Wrong!";
                wrongAnswerMessage.classList.add("message", "wrong");
                choicesElement.appendChild(wrongAnswerMessage);
            }
        })
    })
}


// call this when you want to display the next question
function showNextQuestion() {
    //when called adds 1 to the index which in turn goes to the next question
    questionNumber += 1;

    let questionTitle = questionTitles[questionNumber];

    // displays the question title on the webpage 
    questionTitleElement.textContent = questionTitle;


    showNextChoices();

}




// start the game 
start.addEventListener("click", function (event) {
    event.preventDefault();

    setDisplayTime(startTime);
    // decrease time by 1 every second
    setInterval(decreaseTimeByOne, 1000);
    // hide the start screen 
    startScreen.classList.add("hide");
    // removes the class hide from the question screen to display the question screen
    questionScreen.classList.remove("hide");

    showNextQuestion();
    // firstQuestion();


})
