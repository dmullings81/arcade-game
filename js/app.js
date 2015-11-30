//Super class
/*var Entity = function() {

};

Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};*/









// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.enemySpeed = Math.floor(Math.random() * 2700) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += (dt * this.enemySpeed);

    //reset position of enemy after reaching edge of screen
    //also increase speed depending on score.
    var speedMultiplier = score / 220;
    if (this.x > 503) {
        this.x = -100;
        this.enemySpeed = Math.floor(Math.random() * 270) + 100 + speedMultiplier;
        this.y = randomY();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;



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

ThePlayer.prototype.reset = function() {
    player.x = 200;
    player.y = 405;
};


ThePlayer.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//render the player score on screen
ThePlayer.prototype.renderScore = function() {
    ctx.font = "26px Sigmar One";
    ctx.fillStyle = "white";
    ctx.fillText("Score = " + score,290,80);
};

//render the player's number of remaining lives
ThePlayer.prototype.renderLives = function() {
    ctx.font = "26px Sigmar One";
    ctx.fillStyle = "white";
    ctx.fillText("Lives = " + lives,10,80);
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

var StarItem = function(x,y) {
    this.sprite = 'images/star.png';
    this.x = x;
    this.y = y;
}

StarItem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Function to check if the player position overlaps
//that of the star.
StarItem.prototype.checkStarCollision = function() {
    if (player.x + 50 > star.x &&
            player.x < star.x + 50 &&
            player.y + 70 > star.y &&
            player.y < star.y + 67)
        {
        score += 1000;
        star.x = randomStarX();
        star.y = randomStarY();
    };
};


//variable tracking the player's number of points
var score = 0;



//variable tracking number of lives
var lives = 3;

//render the player's number of remaining lives
var renderLives = function() {
    ctx.font = "26px Sigmar One";
    ctx.fillStyle = "white";
    ctx.fillText("Lives = " + lives,10,80);
};

//Function to check if the player position overlaps
//that of each enemy.
//Collisions using MDN's Axis-Aligned Bounding Box.
var checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x + 67 > allEnemies[i].x &&
            player.x < allEnemies[i].x + 76 &&
            player.y + 70 > allEnemies[i].y &&
            player.y < allEnemies[i].y + 67)
        {player.reset();
        lives -= 1;
    };

        //{ alert("game over");
        //}
    };
};



//Function to check if player has reached the goal.

var checkGoal = function() {
    if (player.y < 10) {
        player.reset();
        score += 500;
    };
};

//function to check number of lives
var checkGameOver = function() {
    if (lives < 0) {
        sweetAlert("Game over!", "Your score was " + score + "!");
        score = 0;
        lives = 3;
        player.reset();
    };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var randomY = function() {
    var randomise = [60, 145, 230][Math.floor(Math.random() * 3)];
    return randomise;
};
var randomStarX = function() {
    var randomise = [0, 100, 202, 303, 405][Math.floor(Math.random() * 5)];
    return randomise;
};

var randomStarY = function() {
    var randomise = [70, 155, 240][Math.floor(Math.random() * 3)];
    return randomise;
};

var allEnemies = [new Enemy(-10,randomY()), new Enemy(-10,randomY()), new Enemy(-10,randomY())];

// Place the player object in a variable called player
var player = new ThePlayer(200,405);

var star = new StarItem(randomStarX(),randomStarY());


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
