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
        answers: ["The Hot Shots", "", "Parikh Models", "Cece's Boys"],
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
]

var indexUsed = [];

var correctAnswers = 0;
var incorrectAnswers = 0;
var noAnswers = 0;

//q[0].question
//q[0].answers[0]
//q[0].right

// var questions = [
//     "What is the name of Winston's cat?" ,
//     "",
//     "",
//     "",
// ]
//each array of questions has an array of answers(maybe an array of objects?)
//var of time count-down 
var intervalId;
var clockRunning = false;
var time = 30;

function resetClock() {
    console.log(time);
    clearInterval(intervalId);
    clockRunning = false;
    time = 30
    $("#time-remaining").text("30 seconds");
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
    $(".question-box").empty().append("<p> Correct Answers: " + correctAnswers + "Incorrect Answers: "
        + incorrectAnswers + "Unanswered Questions: " + noAnswers)
}


function setQuestion() {
    if (indexUsed.length === q.length) {

        // go to results
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
            $(".answer-buttons").append(`<button class="quest" index= ${index} value=${q[index].answers[i]}>${q[index].answers[i]}</button>`)
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
