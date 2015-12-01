/**
* @description Super class used by all entities
* @param sprite - link to sprite
* @param x - Entity's x co-ordinate
* @param y - Entity's y co-ordinate
*/
var Entity = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

/**
*Renders the entity's sprite onto the canvas in the DOM
*/
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// TODO: Add sound effects to super class.


/**
* @description Sub class used for new instances of enemies
* @constructor
* @param x - Enemy's x co-ordinate
* @param y - Enemy's y co-ordinate
*/
var Enemy = function(x,y) {
    //link to sprite used when rendering
    this.sprite = 'images/enemy-bug.png';
    //gives a randomised speed value for each instance of enemy
    this.enemySpeed = Math.floor(Math.random() * 2700) + 100;
    //calls the entity super class and binds 'this'
    Entity.call(this, this.sprite, x, y);
};

//sub class prototype delegation to the Entity super class
Enemy.prototype = Object.create(Entity.prototype);
//sub class constructor delegation
Enemy.prototype.constructor = Enemy;

/**
* @description Update the enemy's position, required method for game
* @param dt - a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    // Multiplies any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (dt * this.enemySpeed);
    //resets position of enemy after reaching edge of screen
    //also increases speed depending on score.
    var speedMultiplier = player.score / 220;
    if (this.x > 503) {
        this.x = -100;
        this.enemySpeed = Math.floor(Math.random() * 270) + 100 + speedMultiplier;
        this.y = randomY();
    };
};

/**
* @description Sub class used for new instance of player
* @param x - Player's x co-ordinate
* @param y - Player's y co-ordinate
*/
var ThePlayer = function(x,y) {
    //link to sprite used when rendering
    this.sprite = 'images/char-boy.png';
    //variable used to track player lives
    this.lives = 3;
    //variable used to track player score
    this.score = 0;
    //calls the entity super class and binds 'this'
    Entity.call(this, this.sprite, x, y);
};

//sub class prototype delegation to the Entity super class
ThePlayer.prototype = Object.create(Entity.prototype);
//sub class constructor delegation
ThePlayer.prototype.constructor = ThePlayer;


//TODO: Get this feature working correctly
/**
* @description Sub class used for new instance of player
* @param x - Player's x co-ordinate
* @param y - Player's y co-ordinate
*/
/*ThePlayer.prototype.increaseDifficulty = function() {
  if (this.score >= 10000 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(-10,randomY()));
    } else if (this.score >= 30000 && allEnemies.length < 5) {
        allEnemies.push(new Enemy(-10,randomY()));
    };
};*/
ThePlayer.prototype.update = function(dt) {
    // TODO: figure out what this is for
};

/**
* @description Resets the player position back to starting location
*/
ThePlayer.prototype.reset = function() {
    player.x = 200;
    player.y = 405;
};

/**
* @description renders the player's score on screen
*/
ThePlayer.prototype.renderScore = function() {
    ctx.font = "26px Sigmar One";
    ctx.fillStyle = "white";
    ctx.fillText("Score = " + this.score,290,80);
};

/**
* @description renders the player's lives on screen
*/
ThePlayer.prototype.renderLives = function() {
    ctx.font = "26px Sigmar One";
    ctx.fillStyle = "white";
    ctx.fillText("Lives = " + this.lives,10,80);
};

/**
* @description Checks if the player position overlaps that of each enemy.
*Subtracts lives and calls the reset function.
*Collisions using MDN's Axis-Aligned Bounding Box.
*/
ThePlayer.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x + 67 > allEnemies[i].x &&
            this.x < allEnemies[i].x + 76 &&
            this.y + 70 > allEnemies[i].y &&
            this.y < allEnemies[i].y + 67) {
                this.reset();
                this.lives -= 1;
            };
        };
};

/**
* @description Checks if the player position has reached the goal area
*and add points accordingly. also resets player position.
*/
ThePlayer.prototype.checkGoal = function() {

    if (this.y < 10) {
        this.reset();
        this.score += 500;
// TODO: Add a timeout here
    };
};

/**
* @description Checks if the player has ran out of lives. Ends the game with an alert.
*/
ThePlayer.prototype.checkGameOver = function() {
    if (this.lives < 0) {
        sweetAlert("Game over!", "Your score was " + this.score + "!");
        this.score = 0;
        this.lives = 3;
        this.reset();
    };
};

/**
* @description instructions for each player input.
*/
ThePlayer.prototype.handleInput = function (userInput) {

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

/**
* @description Sub class used for new instance of star
* @param x - x co-ordinate of star
* @param y - y co-ordinate of star
*/
var StarItem = function(x,y) {
    //link to sprite used when rendering
    this.sprite = 'images/star.png';
    //calls the entity super class and binds 'this'
    Entity.call(this, this.sprite, x, y);
};

//sub class prototype delegation to the Entity super class
StarItem.prototype = Object.create(Entity.prototype);
//sub class constructor delegation
StarItem.prototype.constructor = StarItem;

StarItem.prototype.update = function() {
//TODO: is this necessary?
};

/**
* @description Checks if the player position overlaps that of the star.
*Adds points to players score and moves star.
*/
StarItem.prototype.checkStarCollision = function() {
    if (player.x + 50 > this.x &&
            player.x < this.x + 50 &&
            player.y + 70 > this.y &&
            player.y < this.y + 67) {
        player.score += 1000;
        this.x = randomStarX();
        this.y = randomStarY();
    };
};


//gives a random number of 3 used when instantiating new enemies
var randomY = function() {
    var randomise = [60, 145, 230][Math.floor(Math.random() * 3)];
    return randomise;
};

//gives a random number of 3 used when instantiating new star
var randomStarX = function() {
    var randomise = [0, 100, 202, 303, 405][Math.floor(Math.random() * 5)];
    return randomise;
};

// gives a random number of 3 used when instantiating new star
var randomStarY = function() {
    var randomise = [70, 155, 240][Math.floor(Math.random() * 3)];
    return randomise;
};

// Instatiates an array of 3 enemies with random y co-ordinates
var allEnemies = [new Enemy(-10,randomY()), new Enemy(-10,randomY()), new Enemy(-10,randomY())];

// Instantiates a player
var player = new ThePlayer(200,405);

// Instantiates a star
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
