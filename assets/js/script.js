// List of Questions and Answers

var questions = [
  {
      prompt: "1. What team won the first Super Bowl in 1967?",
      options: ["Green Bay Packers", "Chicago Bears", "Kansas City Chiefs", "Dallas Cowboys"],
      answer: "Green Bay Packers"
  },

  {
      prompt: "2. Who is the NFLs greatest Iron Man? (Most consecutive starts)",
      options: ["Philip Rivers", "Peyton Manning", "Tom Brady", "Brett Favre"],
      answer: "Brett Favre"
  },

  {
      prompt: "3. What team has never had a Hall of Famer play for them?",
      options: ["Jacksonville Jaguars", "Cleveland Browns", "Houston Texans", "Arizona Cardinals"],
      answer: "Jacksonville Jaguars"
  },

  {
      prompt: "4. What team is the only team to go undefeated including the postseason?",
      options: ["New England Patriots", "Philadelphia Eagles", "Miami Dolphins", "Dallas Cowboys"],
      answer: "Miami Dolphins" 
  },

  {
      prompt: "5. What US state has produced the most Hall of Famers?",
      options: ["Mississippi", "Texas", "Florida", "California"],
      answer: "Mississippi"
  },

  {
    prompt: "6. What non-QB player holds the record for most Touchdowns in a single season?",
    options: ["Randy Moss", "Emmit Smith", "Ladainian Tomlinson", "Calvin Johnson"],
    answer: "Ladainian Tomlinson" 
  },

  {
    prompt: "7. Who holds the record for most career receptions?",
    options: ["Calvin Johnson", "Larry Fitzgerald", "Terrell Owens", "Jerry Rice"],
    answer: "Jerry Rice" 
  },

  {
    prompt: "8. What team is the only community owned and non-profit team?",
    options: ["Baltimore Ravens", "Green Bay Packers", "Minnesota Vikings", "Dallas Cowboys"],
    answer: "Green Bay Packers" 
  },

  {
    prompt: "9. Who holds the record for the longest field goal?",
    options: ["Justin Tucker", "Stephen Gostkowski", "Adam Vinatieri", "Jason Hanson"],
    answer: "Justin Tucker" 
  },

  {
    prompt: "10. What team is the newest NFL franchise",
    options: ["Tennessee Titans", "Washington Commanders", "Las Vegas Raiders", "Houston Texans"],
    answer: "Houston Texans" 
  }];

// Get Dom Elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

// Quiz's initial state

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Start quiz and hide frontpage

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and answers and create list with buttons

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check for right answers and deduct time for wrong answer, go to next question

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
      feedbackEl.style.color = "red";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

// End quiz by hiding questions, stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
    var timer = document.querySelector('.timer')
    timer.style.display='none';
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save score in local storage along with users' name

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;