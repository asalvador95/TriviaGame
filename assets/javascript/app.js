var questions = [{
    question: "What did Cinderella drop at the ball?",
    choices: ["Hair Clip", "Glass Slipper", "A Cup", "A Hat"],
    correctAnswer: 1
}, {
    question: "Who is the main character in The Little Mermaid?",
    choices: ["Aurora", "Snow White", "Ariel", "Merida"],
    correctAnswer: 2
}, {
    question: "What does Lilo name her 'dog' when she adopts him?",
    choices: ["Sachi", "Sabrina", "Chase", "Stitch"],
    correctAnswer: 3
}, {
    question: "What fairytale is Tangled based off of?",
    choices: ["Rumpelstiltskin", "Alice's Adventures in Wonderland", "Rapunzel", "Puss in Boots"],
    correctAnswer: 2
}, {
    question: "What year did Aladdin come out?",
    choices: ["1990", "2000", "1985", "1992"],
    correctAnswer: 3
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

var n = 10;
setTimeout(countDown,1000);


function countDown(){
   n--;
   $("#time-left").append("10 Seconds Left!");
    

   if(n > 0){
      setTimeout(countDown,1000);
   }
   else if(n = 0) {
    stop();
   }
   console.log(n);
}


// setTimeout (tenSeconds, 1000);
//       function tenSeconds() {
//         $("#time-left").text("<h2>" + "About 10 Seconds Left" + "</h2>");
//         $("#time-left").append("<h2>About 10 Seconds Left</h2>");
// };

$(document).ready(function () {
      //  after 10 seconds, execute the tenSeconds function


    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];

        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}