// Universal Variables
var timeRemaining = document.getElementById("time-remaining"); 
var highScore = document.getElementById("high-score");
var startQuiz = document.getElementById("start-btn");
var answerResult = document.getElementById("answer-result")
var confimation = document.getElementById("confirmation");
var highestScore = JSON.parse(localStorage.getItem("highscore"));

var quizQuestions = [
	{
		question: "Commonly used data types DO Not Include",
		answers: [
			{ text: "strings", correct: 0},
			{ text: "booleans", correct: 1 },
			{ text: "alerts", correct: 0 },
			{ text: "numbers", correct: 0 } 
		]
	},
  {
		question: "A very useful tool used tool used during development and debugging for printing content to the debugger is:",
		answers: [
			{ text: "JavaScript", correct: 0},
			{ text: "terminal/bash", correct: 0 },
			{ text: "for loops", correct: 0 },
			{ text: "console log", correct: 1} 
		]
	},
	{
		question: "The condition in an if / else statement is enclosed with _________",
		answers: [
			{ text: "quotes", correct: 0},
			{ text: "curly brackets", correct: 1 },
			{ text: "parenthesis", correct: 0 },
			{ text: "square brackets", correct: 0 } 
		]
	},  
	{
		question: "Arrays in JavaScript can be used to store _________.",
		answers: [
			{ text: "numbers and strings", correct: 0},
			{ text: "other arrays", correct: 0 },
			{ text: "booleans", correct: 0 },
			{ text: "all of the above", correct: 1 } 
		]
	},
	{
		question: "String values must be enclosed within _____ when being assigned to variables.",
		answers: [
			{ text: "commas", correct: 0},
			{ text: "curly brackets", correct: 0 },
			{ text: "quotes", correct: 1 },
			{ text: "parenthesis", correct: 0 } 
		]
	}	
];

//  Start quiz and timer
var secondsLeft = 75;
var beginQuiz = function() {
    function startTimer() {
        document.getElementById("results").innerHTML = "";
        nextQuestion();
        var interval = setInterval(function () { 
			if(secondsLeft > 0) {
            secondsLeft--;
            return timeRemaining.textContent = secondsLeft;
            };
            if(secondsLeft == 0) {
                clearInterval(interval);
				if (questionNumber !== quizQuestions.length-1) {
					endQuiz();
				};
            };
            clearInterval(interval);
        }, 1000);
    };
	startTimer();
};

startQuiz.addEventListener("click", beginQuiz)

var questionNumber = 0;
console.log(questionNumber);
var nextQuestion = function() {
	if (questionNumber == quizQuestions.length-1) {
		endQuiz();
	} else {
		showQuestions(quizQuestions[questionNumber]);
	};
};
// Display questions and results
var showQuestions = function(question) {

	document.querySelector(".start-page").classList.add("hide");
	var theQuestion = document.createElement("h1");
	theQuestion.textContent = question.question;
	document.getElementById("quiz-questions").appendChild(theQuestion);

	for (var i = 0; i < question.answers.length; i++) {
		var quizAnswers = document.createElement("button")
		quizAnswers.textContent = question.answers[i].text;
		quizAnswers.classList.add("answers-style")
		quizAnswers.setAttribute("answer", question.answers[i].correct);
		document.getElementById("quiz-questions").appendChild(quizAnswers);
		quizAnswers.classList.add("used")
		quizAnswers.addEventListener("click", function(event) {
			var answerCorrect = JSON.parse(event.target.getAttribute("answer"));
			if (!answerCorrect) {
				confimation.classList.add("result")
				confimation.textContent = "Wrong!";
				answerResult.appendChild(confimation);
				secondsLeft = secondsLeft - 10;
				nextQuestion();
			}; 
			if (answerCorrect) {
				confimation.classList.add("result")
				confimation.textContent = "Correct!";
				answerResult.appendChild(confimation);
			};
			document.getElementById("quiz-questions").innerHTML = "";
			questionNumber++;
			nextQuestion();
		})
	}
};

var endQuiz = function() {
	document.getElementById("nav").classList.add("hide");
	var highScore = secondsLeft;
	//clear the screen 
	document.getElementById("quiz-questions").innerHTML = "";
	document.getElementById("answer-result").innerHTML = "";
	
	// Save highscore to local storage
	if (secondsLeft > 0) {
		var endPage = document.createElement("h1");
		endPage.textContent = ("You finished with a score of " + secondsLeft + ".");
		document.getElementById("results").appendChild(endPage);
	
		var saveScorePrompt = document.createElement("h2");
		saveScorePrompt.textContent = (" Enter your initials to save your score.");
		document.getElementById("results").appendChild(saveScorePrompt);
	
	
		var initialsPrompt = document.createElement("input");
		initialsPrompt.textContent = "enter your initials to save your high score";
		document.getElementById("results").appendChild(initialsPrompt);
	
		var saveHighScore = document.createElement("button");
		saveHighScore.textContent = "Save score";
		document.getElementById("results").appendChild(saveHighScore);

		var highScoreArr = [
			{user: ""},
			{score: ""}
		];
		
		saveHighScore.addEventListener("click", function(){
			var initials = document.querySelector("input").value;
			highScoreArr = [initials, highScore];
			console.log(highScoreArr);
			saveScore();
		});

	} else {
		var outOfTime = document.createElement("h1");
		outOfTime.textContent = ("Time has expired!");
		document.getElementById("results").appendChild(outOfTime);
	}
}

var saveScore = function() {
	localStorage.setItem("highscore", JSON.stringify(highScoreArr));
  console.log(saveScore)
  };