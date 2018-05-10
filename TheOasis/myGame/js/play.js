var render = function(){};
var endTimer = function(){};
var formatTime = function(){};

var timer, timerEvent, text;

var player;
var up;
var down;
var left;
var right;
var velocity;
var enemies;
var background;
var oasis;
var kill = 0;

var playState = {
	create: function() {
	// place your assets
    game.physics.startSystem(Phaser.Physics.ARCADE);

    timer = game.time.create();

	timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 0, this.endTimer, this);

	timer.start();

    background = game.add.image(300,300, 'background');
    background.anchor.setTo(0.5,0.5);
    background.scale.setTo(50,50);

    oasis = game.add.image(600, 600, 'tree');
    oasis.anchor.setTo(1,1);
    oasis.scale.setTo(1.5,1.5);
    oasis.enableBody = true;
    
    enemies = game.add.group();
    enemies.enableBody = true;
    //game.physics.arcade.enable(enemies);

    for(var i = 0; i < 5; i++){
        var enemy = enemies.create(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(0, game.height/2), 'enemy');
        enemy.anchor.setTo(0.5,0.5);
        enemy.scale.setTo(2,2);
        enemy.body.collideWorldBounds = true;
    }

    player = game.add.sprite(300,500, 'player');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(1,1);
    //player.enableBody = true;
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

},

update: function() {
	// run game loop
    game.physics.arcade.overlap(player, enemies, killenemy, null, this);

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if(up.isDown && kill == 0){
        player.body.velocity.y = -300;
    }
    if(up.isDown && kill == 1){
        player.body.velocity.y = -250;
    }
    if(up.isDown && kill == 2){
        player.body.velocity.y = -200;
    }
    if(up.isDown && kill == 3){
        player.body.velocity.y = -150;
    }
    if(up.isDown && kill >= 4){
        player.body.velocity.y = -100;
    }

    if(down.isDown && kill == 0){
        player.body.velocity.y = 300;
    }
    if(down.isDown && kill == 1){
        player.body.velocity.y = 250;
    }
    if(down.isDown && kill == 2){
        player.body.velocity.y = 200;
    }
    if(down.isDown && kill == 3){
        player.body.velocity.y = 150;
    }
    if(down.isDown && kill >= 4){
        player.body.velocity.y = 100;
    }

    if(left.isDown && kill == 0){
        player.body.velocity.x = -300;
    }
    if(left.isDown && kill == 1){
        player.body.velocity.x = -250;
    }
    if(left.isDown && kill == 2){
        player.body.velocity.x = -200;
    }
    if(left.isDown && kill == 3){
        player.body.velocity.x = -150;
    }
    if(left.isDown && kill >= 4){
        player.body.velocity.x = -100;
    }

    if(right.isDown && kill == 0){
        player.body.velocity.x = 300;
    }
    if(right.isDown && kill == 1){
        player.body.velocity.x = 250;
    }
    if(right.isDown && kill == 2){
        player.body.velocity.x = 200;
    }
    if(right.isDown && kill == 3){
        player.body.velocity.x = 150;
    }
    if(right.isDown && kill >= 4){
        player.body.velocity.x = 100;
    }

},

render: function () {
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timer.running) {
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 270, 586, '#fff');
        }
        else {
            game.debug.text("Gameover!", 270, 586, '#fff ');
        }
    },

endTimer: function() {
        // Stop the timer when the delayed event triggers
        timer.stop();
    },
formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    },

};

function killenemy(player, enemy){
    enemy.kill();
    kill ++;
}








