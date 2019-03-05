
var wins = 0;
var losses = 0;

var start = false;
var targetNumber;
var counter;
var crystalValue;
var guessesLeft;

// creates jquery shortcut analagous to "hide" for css visibility
(function ($) {
    $.fn.invisible = function () {
        return this.each(function () {
            $(this).css("visibility", "hidden");
        });
    };
    $.fn.visible = function () {
        return this.each(function () {
            $(this).css("visibility", "visible");
        });
    };
}(jQuery));

// runs on refresh and upon game win or loss
function restart() {

    // resets Guesses Left, crystal image visibility, creates new target number (and shows it in html), and resets your number to 0
    guessesLeft = 25;
    $("#guesses").text(guessesLeft);
    $("#image0, #image1, #image2, #image3").visible();
    $("#image4, #image5, #image6, #image7, #image8, #image9, #image10, #image11, #image12, #image13, #image14, #image15").invisible();
    targetNumber = Math.floor(Math.random() * 32) + 29;
    console.log(targetNumber);
    $("#guessnum").text(targetNumber);
    counter = 0;
    $("#inputcounter").text(counter);
    // adds data values to all 16 crystals. If the value set is 0, it iterates [i] again to yield different value
    var numberOptions = [];
    for (i = 0; i < 4; i++) {
        numberOptions[i] = Math.floor(Math.random() * 18) - 5;
        $("#image" + i).attr("data-crystalvalue", numberOptions[i]);
        $("#image" + (4 + i)).attr("data-crystalvalue", (numberOptions[i]) * 2);
        $("#image" + (8 + i)).attr("data-crystalvalue", numberOptions[i]);
        $("#image" + (12 + i)).attr("data-crystalvalue", numberOptions[i] * -1);
        if (numberOptions[i] === 0) {
            i--;
        }
    }
    console.log(numberOptions);
}

// onclick function. selects the div that contains the crystal image (eg "this")
$(".images").on("click", function () {

    guessesLeft--;
    $("#guesses").text(guessesLeft);

    // using the naming structure for the images (#image0 - #image15), this conditional turns off visibility of clicked image and on visibility of
    // corresponding (same column) image in the next row down. bottom row recycles back to top
    $(this).invisible();
    var splits = this.id.split("");
    if (splits[6]) {
        var number = parseInt(splits[5] + splits[6]);
        if (number >= 12) {
            $("#image" + (number - 12)).visible();
        }
        else $("#image" + (number + 4)).visible();
    }
    else {
        var number = parseInt(splits[5]);
        $("#image" + (number + 4)).visible();
    }
    // if 3rd row is clicked, subract 3 from target number
    if (8 <= number && number <= 11) {
        targetNumber -= 3;
    }
    $("#guessnum").text(targetNumber);

    // takes data value of clicked image, parses it into an integer, and adds it to counter
    crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    // open the console to see initial target score, base values for all 4 crystals, and the value logged on each click
    console.log(crystalValue);
    counter += crystalValue;
    $("#inputcounter").text(counter);

    // win/loss conditionals
    if (counter === targetNumber) {
        wins++;
        $("#Wins").text(wins);
        counter = 0;
        $("#inputcounter").text(counter);
        restart();
    }

    else if (guessesLeft === 0) {
        losses++;
        $("#Losses").text(losses);
        counter = 0;
        $("#inputcounter").text(counter);
        restart();
    }

});
// initial call of restart function
restart();