function player(name, health, attack, counter, id, imageUrl) {
    this.name = name;
    this.healthPoints = health;
    this.attackPower = attack;
    this.counterAttack = counter;
    this.id = id;
    this.image = imageUrl;
    this.currentHealth = function (damage) {
        var playerHealth = this.healthPoints - damage;
        return playerHealth;
    }
}

var yoda = new player("Yoda", 120, 8, 5, "yoda", "assets/images/yoda.png");
var rey = new player("Rey", 100, 5, 5, "rey", "assets/images/rey.png");
var vader = new player("Darth Vader", 150, 5, 20, "vader", "assets/images/darth_vader.png");
var kylo = new player("Kylo Ren", 180, 5, 25, "kylo", "assets/images/kylo.png");

var players = [yoda, rey, vader, kylo];

//start
for (var i = 0; i < players.length; i++) {
    var characterDiv = "<div class='ready col-md-3' id='" + players[i].id + "'></div>";
    var characterSelector = "#" + players[i].id;
    var characterName = "<h2>" + players[i].name + "</h2>";
    var characterImage = "<img src='" + players[i].image + "'>";
    var characterHealth = "<h2>" + players[i].healthPoints + "</h2>";
    $("#characters").append(characterDiv);
    $(characterSelector).append(characterName);
    $(characterSelector).append(characterImage);
    $(characterSelector).append(characterHealth);
}
//select attacker and defender

var firstSelected = false;
var secondSelected = false;
var attacker = null;
var defender = null;

$(document).on("click", ".ready", function () {
    $("#restartButton").hide();
    if (!firstSelected) {
        firstSelected = true;
        var idSelector = "#" + this.id;
        $(idSelector).empty();
        attacker = eval(this.id);
        var characterName = "<h2>" + attacker.name + "</h2>";
        var characterImage = "<img src='" + attacker.image + "'>";
        var characterHealth = "<h2>" + attacker.healthPoints + "</h2>";
        $("#characters").append("<h3>Enemies Available to Fight</h3>");
        $("#yourCharacter").append(characterName);
        $("#yourCharacter").append(characterImage);
        $("#yourCharacter").append(characterHealth);
        $("#characters h2").css({
            "color": "red"
        });
        $("#versus").html("<h2>VS</h2>")
    } else if (!secondSelected) {
        secondSelected = true;
        var idSelector = "#" + this.id;
        $(idSelector).empty();
        defender = eval(this.id);
        var characterName = "<h2>" + defender.name + "</h2>";
        var characterImage = "<img src='" + defender.image + "'>";
        var characterHealth = "<h2>" + defender.healthPoints + "</h2>";
        $("#defender").append(characterName);
        $("#defender").append(characterImage);
        $("#defender").append(characterHealth);
    }
});

$("#restartButton").hide();
var restart = false;
var i = 0;
var j = 0;
var r = 0;
$("#attackButton").on("click", function () {
    if (attacker != null && defender != null) {
        if (restart === false) {
            //attacker attack
            i++;
            j = j + i;
            //defender counter
            r++;
            var attackerHealth = attacker.currentHealth(defender.counterAttack * r);
            var defenderHealth = defender.currentHealth(attacker.attackPower * j);
            // attacker information
            $("#yourCharacter h2").eq(1).html(attackerHealth);
            // defender information
            $("#defender h2").eq(1).html(defenderHealth);
            var battleInfo = null;
            if (attackerHealth <= 0) {
                battleInfo = "You have been defeated ... GAME OVER!!! <br>";
                restart = true;
                attacker = null;
                defender = null;
                $("#restartButton").show();
            } else {
                battleInfo = "You attacked " + defender.name + " for " + attacker.attackPower * i;
                battleInfo += "<br>" + defender.name + " attacked you back for " + defender.counterAttack + " damage";
            }
            if (defenderHealth <= 0) {
                $("#defender").empty();
                secondSelected = false;
                defender = null;
                r = 0;
                $("#attackInfo").empty();
                $("#versus").empty();
            }
            $("#attackInfo").html(battleInfo);
        }
    }
});

$("#restartButton").on("click", function () {
    i = 0;
    j = 0;
    r = 0;
    firstSelected = false;
    secondSelected = false;
    attacker = null;
    defender = null;
    $("#characters").empty();
    $("#yourCharacter").empty();
    $("#defender").empty();
    $("#attackInfo").empty();
    $("#versus").empty();

    restart = false;
    for (var i = 0; i < players.length; i++) {
        var characterDiv = "<div class='ready col-md-3' id='" + players[i].id + "'></div>";
        var characterSelector = "#" + players[i].id;
        var characterName = "<h2>" + players[i].name + "</h2>";
        var characterImage = "<img src='" + players[i].image + "'>";
        var characterHealth = "<h2>" + players[i].healthPoints + "</h2>";
        $("#characters").append(characterDiv);
        $(characterSelector).append(characterName);
        $(characterSelector).append(characterImage);
        $(characterSelector).append(characterHealth);
    }
});