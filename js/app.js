// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.enemySpeed = Math.floor(Math.random() * 250) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += (dt * this.enemySpeed);

    if (this.x > 503) {
        this.x = -100;
        this.enemySpeed = Math.floor(Math.random() * 300) + 150;
        this.y = randomY();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var ThePlayer = function(x,y) {

    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};


ThePlayer.prototype.update = function(dt) {
    // TODO: figure out what this is for
};

ThePlayer.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

ThePlayer.prototype.handleInput = function (userInput) {

    //player inputs up down left right
    if  (userInput === 'left') {
        if (this.x <= -2) {

        } else {
        this.x -= 101;
        };
    };

    if  (userInput === 'right') {
        if (this.x >= 402) {

        } else {
        this.x += 101;
        };
    };

    if  (userInput === 'up') {
        if (this.y <= 0) {

        } else {
        this.y -= 83;
        };
    };

    if  (userInput === 'down') {
        if (this.y >= 400) {
        } else {
        this.y += 83;
        };
    };

};

//Function to check if the player position overlaps
//that of each enemy.
//Use of MDN's Axis-Aligned Bounding Box.
//Player width is 67px, height is 75px
//Enemy width is 96px, height is 67px
var checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x + 67 > allEnemies[i].x &&
            player.x < allEnemies[i].x + 96 &&
            player.y + 70 > allEnemies[i].y &&
            player.y < allEnemies[i].y + 67)
        {player.x = 200;
        player.y = 405;
    };
        //{ alert("game over");
        //}
    };
};

//Function to check if player has reached the goal.

var checkGoal = function() {
    if (player.y < 10) {
        player.x = 200;
        player.y = 405;
        alert("you win");
    };
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var randomY = function() {
    var randomise = [60, 145, 230][Math.floor(Math.random() * 3)];
    return randomise;
};
var allEnemies = [new Enemy(-10,randomY()), new Enemy(-10,randomY()), new Enemy(-10,randomY())];

// Place the player object in a variable called player
var player = new ThePlayer(200,405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
