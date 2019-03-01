
var wins = 0;
var losses = 0;

var start = true;
var targetNumber;
var counter;
var crystalValue;

function restart() {
    targetNumber = Math.floor(Math.random() * 102) + 19;
    console.log(targetNumber);
    $("#guessnum").text(targetNumber);

    counter = 0;

    var numberOptions = [];
    for (i = 0; i < 4; i++) {
        numberOptions[i] = Math.floor(Math.random() * 12) + 1;
        $("#image" + i).attr("data-crystalvalue", numberOptions[i]);
    }
    console.log(numberOptions);

    $(".images").on("click", function () {

        crystalValue = ($(this).attr("data-crystalvalue"));
        console.log(crystalValue);
        crystalValue = parseInt(crystalValue);
        counter += crystalValue;
        $("#inputcounter").text(counter);

        // console.log(targetNumber);
        console.log(counter);
        if (counter === targetNumber) {
            wins++;
            $("#Wins").text(wins);
            counter = 0;
            
            restart();
            return;
        }

        else if (counter > targetNumber) {
            losses++;
            $("#Losses").text(losses);
            counter = 0;
            
            restart();
            return;
        }

    });

}
if (start) {
    restart();
    start = false;
}