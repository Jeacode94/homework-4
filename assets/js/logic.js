// var timer
var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;
var score = 0;

// var elements and inputs
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var questionTitle = document.getElementById("question-title");

// sound effects
var sfxRight = new Audio("correct.wav");
var sfxWrong = new Audio("incorrect.wav");

// start quiz function
function startQuiz() {

    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    // show questions
    questionsEl.removeAttribute("class");

    //  start timer
    timerId = setInterval(clockTick, 1000);

    // show time
    timerEl.textContent = time;
    getQuestion();
}

// get questions function
function getQuestion() {

    // get current question from array
    var currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = " ";

    // loop over choices
    currentQuestion.choices.forEach(function (choice, i) {

        // create new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;

        // attach click event listener to each choice
        choiceNode.onclick = questionClick;

        // display on the page
        choicesEl.appendChild(choiceNode);
    });
}
function questionClick() {

    //  check if user guessed wrong
    if (this.value != questions[currentQuestionIndex].answer) {

        // penalize time
        time -= 10;
        if (time < 0) {
            time = 0;
        }

        // displaying new time
        timerEl.textContent = time;

        // play "wrong" sound effect
        sfxWrong.play();
        feedbackEl.textContent = "wrong!";
    }
    else {

        // play "right" sound effect
        sfxRight.play();
        feedbackEl.textContent = "Correct!";
    }

    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // move to next question
    currentQuestionIndex++;

    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {

    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score")
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {

    // update time
    time--;
    timerEl.textContent = time;

    // check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {

    // get value of input box
    var initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initialsEl !== "") {

        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to next page
        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
    // check if event key is enter
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;