//create var:
//array of questions

var q = [
    {
        question: "What is the name of Winston's cat?",
        answers: ["Checkers", "Ferguson", "Oliver", "Fluffy"],
        right: "Ferguson",
    },
    {
        question: "What did Cece call her modeling business?",
        answers: ["The Hot Shots", "Cece's Models", "Parikh Models", "Cece's Boys"],
        right: "Cece's Boys",
    },
    {
        question: "What is Schmidt's first name?",
        answers: ["William", "Alexander", "Winston", "David"],
        right: "Winston",
    },
    {
        question: "Who was Coach texting on his date with Cece",
        answers: ["his ex girlfriend", "Nick", "his chiropractor", "his mom"],
        right: "his mom",
    },
    {
        question: "What shape did Nick's bar crawl route make on the map?",
        answers: ["hat", "smiley face", "jellyfish", "Pacman"],
        right: "smiley face",
    },
    {
        question: "What was the clothing invention that Nick and Schmidt came up with?",
        answers: ["swuit", "scacket", "pajirt", "glatch"],
        right: "swuit",
    },
    {
        question: "Where do Nick and Jess flee to when they first start dating?",
        answers: ["Canada", "Florida", "Mexico", "Texas"],
        right: "Mexico",
    },
    {
        question: "What did Cece and Schmidt name the house they bought together?",
        answers: ["The Main Loft", "Jaipur Aviv", "Schmece's Crib", "Pleasure Pad"],
        right: "Jaipur Aviv",
    },
    {
        question: "What is the name of Nick's friend from the park",
        answers: ["Joey", "Bob", "Tran", "Bearclaw"],
        right: "Tran",
    },
    {
        question: "Who ends up getting the parking spot that the loft members fight for?",
        answers: ["Nick", "Jess", "Schmidt", "Winston"],
        right: "Winston",
    }
]

var indexUsed = [];

var correctAnswers = 0;
var incorrectAnswers = 0;
var noAnswers = 0;

var intervalId;
var clockRunning = false;
var time = 30;

function resetClock() {
    console.log(time);
    clearInterval(intervalId);
    clockRunning = false;
    time = 20
    $("#time-remaining").text("20 seconds");
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }
}

function count() {

    time--;
    if (time === 0) {
        noAnswers++;
        reset("You ran of time!");

    }


    $("#time-remaining").text(time + " seconds");

}

function reset(text) {
    clearInterval(intervalId);
    $(".answer-buttons").empty().append("<p>" + text + "</p>");
    setTimeout(setQuestion, 5000);

}

function results() {
    $(".question-box").empty().append("<h3> Game Over! </h3>" + "<br>" + "<p> Correct Answers: " + correctAnswers + "</p>" + "Incorrect Answers: "
        + incorrectAnswers + "</p>" + "Unanswered Questions: " + noAnswers + "</p>")
}


function setQuestion() {

    if (indexUsed.length === q.length) {

        results();
    }
    else {
        resetClock();
        var index = -1

        while (index < 0) {
            indexTemp = Math.floor((Math.random() * q.length))
            console.log("indexTemp: ", indexTemp)
            if (indexUsed.indexOf(indexTemp) === -1) {
                index = indexTemp
                indexUsed.push(index);

            }
        }
        console.log("index: ", index)
        $("#question").text(q[index].question);
        //need build the buttons // loop
        $(".answer-buttons").empty()
        for (var i = 0; i < q[index].answers.length; i++) {
            var buttons = $("<button>").addClass("quest").val(q[index].answers[i]).attr("index", index).text(q[index].answers[i]);
            $(".answer-buttons").append(buttons);

            // $(".answer-buttons").append("<button index=" + index + "value=" + q[index].answers[i] + ">" + q[index].answers[i] + "</button>")
        }
        $(".quest").on("click", function () {
            console.log(this)
            var resp = $(this).attr("value")
            var index = $(this).attr("index")
            console.log(resp, index, q[index].right);
            if (resp === q[index].right) {
                correctAnswers++;
                reset("Good Job! You guessed it right!");

            }

            else {
                incorrectAnswers++;
                reset("You picked the wrong answer!");
            }

        })
    }
}

//$("#start").on("click", resetClock);
$("#start").on("click", setQuestion);



    //for loop? 15 questions
        //make sure questions picked randomly are not duplicated
    //random question is chosen from array of questions and displayed
    //answers related to those questions are displays 
        //how do I do this? an array?
    //timer starts counting down from 30 seconds
        //if user clicks wrong button 
            //display "wrong answer"
            //display correct answer
            //restart the clock 
            //choose another random question
        //else if user clicks right button 
            //display "you got it right!"
            //display correct answer 
            //restart clock 
            //choose another random question 
        //else if (timer reaches 0)
            //display "you're out of time!"
            //display correct answer 
            //restart clock 
            //choose another random question
