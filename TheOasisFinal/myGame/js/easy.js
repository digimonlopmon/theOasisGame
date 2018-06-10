var counter = 30; //Counter for Oasis's life
var text = 30; //text for the counter
var level = 60; //counter for easy level
var leveltext = 60; //counter text for easy level
var level1 = 90; //counter for medium/hard level
var leveltext1 = 90; //counter text for medium/hard level
var player; //player var
var up; //control arrow key
var down; //control arrow key
var left; //control arrow key
var right; //control arrow key
var velocity; //player's velocity
var enemy; //enemy var
var enemies; //group up enemies
var energy; //energy drink var
var energies; //group up energy drinks
var background; //background map var
var oasis; //the oasis var
var dead; //dead tree var
var water; //water var
var warning; //draining warning
var rock1; //obstacle var
var havewater; //text to show if player has water or not
var wateronplayer = false; //check if player has water
var kill = 0; //number of enemies player killed
var eat; //key for player to eat enemy and energy drink
var collect; //key for player to get and drop water
var esc; //pause menu
var bgm; //bgm var
var eatsound; //sound effect for killing enemy
var drinksound; //sound effect for drinking energy
var getwatersound; //sound effect for getting water
var dropwatersound; //sound effect for dropping water
var health; //health bar for oasis

var easyState = {
	create: function() {
	//enable arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //create bgm
    bgm = game.add.audio('bgm1');
    bgm.volume = 1;
    bgm.loop = true;
    bgm.play();

    //add killing sound
    eatsound = game.add.audio('eat');

    //add drinking sound
    drinksound = game.add.audio('drink');

    //add water sound
    getwatersound = game.add.audio('getwater');
    dropwatersound = game.add.audio('dropwater');
    
    //create the background map
    background = game.add.image(300,300, 'background');
    background.anchor.setTo(0.5,0.5);
    background.scale.setTo(1.5,1.5);

    //create the oasis at bottom right corner
    oasis = game.add.sprite(600, 600, 'oasis');
    oasis.anchor.setTo(1,1);
    oasis.scale.setTo(2,2);
    oasis.enableBody = true;
    game.physics.arcade.enable(oasis);

    //dead tree
    dead = game.add.image(150, 500, 'dead');
    dead.anchor.setTo(0.5, 0.5);
    dead.scale.setTo(1.5, 1.5);
    dead = game.add.image(50, 350, 'dead');
    dead.anchor.setTo(0.5, 0.5);
    dead.scale.setTo(1.5, 1.5);

    //warning for oasis draining
    warning = game.add.sprite(600, 570, 'warning');
    warning.anchor.setTo(1,1);
    warning.scale.setTo(3,3);

    //create water source at top left corner
    water = game.add.sprite(40, 40, 'water');
    water.anchor.setTo(0.5, 0.5);
    water.scale.setTo(1,1);
    water.enableBody = true;
    game.physics.arcade.enable(water);

    //create some obstacles
    rock1 = game.add.sprite(game.rnd.integerInRange(100, 500), game.rnd.integerInRange(100, 500), 'rock');
    rock1.anchor.setTo(0.5, 0.5);
    rock1.scale.setTo(1,1);
    rock1.enableBody = true;
    game.physics.arcade.enable(rock1);
    rock1.body.immovable = true;

    //create enemies
    enemies = game.add.group();
    enemies.enableBody = true;
    game.physics.enable(enemies);
    game.time.events.loop(Phaser.Timer.SECOND * 4, this.createEnemy, this);

    //create energy drinks
    energies = game.add.group();
    energies.enableBody = true;
    game.physics.enable(energies);
    game.time.events.loop(Phaser.Timer.SECOND * 10, this.createEnergy, this);

    //create the player
    player = game.add.sprite(300,500, 'player');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(1,1);
    player.enableBody = true;
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.animations.add('left', [6, 7], 5, true);
    player.animations.add('right', [8, 9], 5, true);
    player.animations.add('back', [0, 1], 5, true);
    player.animations.add('front', [2, 3, 4, 5], 5, true);
    player.animations.play('front');

    //in game text shows if water has been obtained
    havewater = game.add.text(16, 560, 'Water: ✗', { fontSize: '24px', fill: '#3399FF' });
    havewater.stroke = '#000000';
    havewater.strokeThickness = 4;

    //countdown timer/health bar for the oasis's life
    text = game.add.text(300, 560, 'OasisLife', {font: '24px', fill: '#04A713'});
    text.anchor.setTo(0.5, 0.5);
    text.stroke = '#000000';
    text.strokeThickness = 4;
    game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    health = game.add.sprite(300, 580, 'health');
    health.anchor.setTo(0.5, 0.5);
    health.scale.setTo(0.5, 0.5);
    health.animations.add('0', [0], 5, true);
    health.animations.add('1', [1], 5, true);
    health.animations.add('2', [2], 5, true);
    health.animations.add('3', [3], 5, true);
    health.animations.add('4', [4], 5, true);
    health.animations.add('5', [5], 5, true);
    health.animations.add('6', [6], 5, true);
    health.animations.add('7', [7], 5, true);
    health.animations.add('8', [8], 5, true);
    health.animations.add('9', [9], 5, true);

    //level counter
    leveltext = game.add.text(300, 30, '60', { font: "30px", fill: "#3399FF"});
    leveltext.anchor.setTo(0.5, 0.5);
    leveltext.stroke = '#000000';
    leveltext.strokeThickness = 4;
    game.time.events.loop(Phaser.Timer.SECOND, this.levelCounter, this);

    //create movement arrow keys and action keys
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    eat = game.input.keyboard.addKey(Phaser.Keyboard.X);
    collect = game.input.keyboard.addKey(Phaser.Keyboard.Z);

    //pause menu
    esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    esc.onDown.add(this.unpause, this);
    
    //Create the 'back to title screen' button
    menu_label = game.add.text(300, 300, 'Back to Title Screen', {font: '32px', fill: '#3399FF'});
    menu_label.stroke = '#000000';
    menu_label.strokeThickness = 8;
    menu_label.anchor.setTo(0.5, 0.5);
    menu_label.inputEnabled = true;
    menu_label.events.onInputOver.add(function () {
        menu_label.fill = '#DA0404'
    });
    menu_label.events.onInputOut.add(function () {
        menu_label.fill = '#3399FF'
    });
    menu_label.events.onInputDown.add(this.backtotitle, this);

    //create the 'restart' button
    restart_label = game.add.text(300, 250, 'Restart', {font: '32px', fill: '#3399FF'});
    restart_label.stroke = '#000000';
    restart_label.strokeThickness = 8;
    restart_label.anchor.setTo(0.5, 0.5);
    restart_label.inputEnabled = true;
    restart_label.events.onInputOver.add(function () {
        restart_label.fill = '#DA0404'
    });
    restart_label.events.onInputOut.add(function () {
        restart_label.fill = '#3399FF'
    });
    restart_label.events.onInputDown.add(this.restart, this);
},

update: function() {

    //invisible to pause menu
    menu_label.visible = false;
    restart_label.visible = false;
    
    //pause the game and show the pause menu by pressing ESC
    if(esc.isDown){
        bgm.pause();
        game.paused = true;
        menu_label.visible = true;
        restart_label.visible = true;
    }

	//invisible the oasis's hitbox
	oasis.visible = false;

    //warning if oasis life is lower than 10 sec
    if(counter < 10){
        warning.visible = true;
    } else{
        warning.visible = false;
    }

    //collide player and obstacles
    game.physics.arcade.collide(player, rock1);

	//run following functions when certain sprites overlap
    game.physics.arcade.overlap(player, enemies, this.killenemy, null, this);
    game.physics.arcade.overlap(oasis, enemies, this.killenemies, null, this);
    game.physics.arcade.overlap(player, energies, this.killenergy, null, this);
    game.physics.arcade.overlap(player, water, this.getwater, null, this);
    game.physics.arcade.overlap(player, oasis, this.dropwater, null, this);

    //player's movement velocity
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    //player's movement
    if(up.isDown && kill == 0){
        player.body.velocity.y = -300;
        player.animations.play('back');
    }
    if(up.isDown && kill == 1){
        player.body.velocity.y = -250;
        player.animations.play('back');
    }
    if(up.isDown && kill == 2){
        player.body.velocity.y = -200;
        player.animations.play('back');
    }
    if(up.isDown && kill == 3){
        player.body.velocity.y = -150;
        player.animations.play('back');
    }
    if(up.isDown && kill >= 4){
        player.body.velocity.y = -100;
        player.animations.play('back');
    }

    if(down.isDown && kill == 0){
        player.body.velocity.y = 300;
        player.animations.play('front');
    }
    if(down.isDown && kill == 1){
        player.body.velocity.y = 250;
        player.animations.play('front');
    }
    if(down.isDown && kill == 2){
        player.body.velocity.y = 200;
        player.animations.play('front');
    }
    if(down.isDown && kill == 3){
        player.body.velocity.y = 150;
        player.animations.play('front');
    }
    if(down.isDown && kill >= 4){
        player.body.velocity.y = 100;
        player.animations.play('front');
    }

    if(left.isDown && kill == 0){
        player.body.velocity.x = -300;
        player.animations.play('left');
    }
    if(left.isDown && kill == 1){
        player.body.velocity.x = -250;
        player.animations.play('left');
    }
    if(left.isDown && kill == 2){
        player.body.velocity.x = -200;
        player.animations.play('left');
    }
    if(left.isDown && kill == 3){
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    if(left.isDown && kill >= 4){
        player.body.velocity.x = -100;
        player.animations.play('left');
    }

    if(right.isDown && kill == 0){
        player.body.velocity.x = 300;
        player.animations.play('right');
    }
    if(right.isDown && kill == 1){
        player.body.velocity.x = 250;
        player.animations.play('right');
    }
    if(right.isDown && kill == 2){
        player.body.velocity.x = 200;
        player.animations.play('right');
    }
    if(right.isDown && kill == 3){
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    if(right.isDown && kill >= 4){
        player.body.velocity.x = 100;
        player.animations.play('right');
    }

    //oasis's health bar
    if(counter >= 27){
        health.animations.play('9');
    }
    if(counter < 27 && counter >= 24 ){
        health.animations.play('8');
    }
    if(counter < 24 && counter >= 21 ){
        health.animations.play('7');
    }
    if(counter < 21 && counter >= 18 ){
        health.animations.play('6');
    }
    if(counter < 18 && counter >= 15 ){
        health.animations.play('5');
    }
    if(counter < 15 && counter >= 12 ){
        health.animations.play('4');
    }
    if(counter < 12 && counter >= 9 ){
        health.animations.play('3');
    }
    if(counter < 9 && counter >= 6 ){
        health.animations.play('2');
    }
    if(counter < 6 && counter >= 3 ){
        health.animations.play('1');
    }
    if(counter < 3 && counter >= 0 ){
        health.animations.play('0');
    }

    //if Oasis's life runs out, start the gameover state
    if(counter == 0){
    	game.state.start('over');
    	counter = 30;
    	kill = 0;
    	wateronplayer = false;
        bgm.pause();
        level = 60;
        level1 = 90;
    }

    //start win state if the level counter runs out
    if(level == 0){
        game.state.start('win1');
        counter = 30;
        kill = 0;
        wateronplayer = false;
        bgm.pause();
        level = 60;
        level1 = 90;
    }

},

//unpause the game by pressing ESC again
unpause: function(){
    if(game.paused){
        bgm.resume();
        game.paused = false;
        menu_label.visible = false;
        restart_label.visible = false;
    }
},

//back to the title screen by clicking the 'Back to Titlescreen'
backtotitle: function(){
    if(game.paused){
        game.paused = false;
        game.state.start('menu');
        counter = 30;
        kill = 0;
        wateronplayer = false;
        bgm.pause();
        level = 60;
        level1 = 90;
    }
},

//restart current level by clicking the 'Restart'
restart: function(){
    if(game.paused){
        game.paused = false;
        game.state.start('easy');
        counter = 30;
        kill = 0;
        wateronplayer = false;
        bgm.pause();
        level = 60;
        level1 = 90;
    }
},

//the counter function for oasis's life
updateCounter: function(){
    counter--;
},

//the level counter function 
levelCounter: function(){
    level--;
    leveltext.setText(level);
},

//function for creating enemy
createEnemy: function(){
	enemy = enemies.create(game.rnd.integerInRange(0, 580), 0, 'enemy');
	enemy.anchor.setTo(0.5,0.5);
    enemy.scale.setTo(2,2);
    enemy.enableBody = true;
    game.physics.arcade.enable(enemy);
    game.physics.arcade.moveToXY(enemy, 600, 600, game.rnd.integerInRange(20, 50));
    enemy.animations.add('move', [0,1], 10, true);
    enemy.animations.play('move');   
},

//function for creating energy drink
createEnergy: function(){
    energy = energies.create(game.world.randomX, game.world.randomY, 'energy');
    energy.anchor.setTo(0.5,0.5);
    energy.scale.setTo(1,1);
    energy.enableBody = true;
    game.physics.arcade.enable(energy);
    energy.body.collideWorldBounds = true;
},

//function for obtaining water
getwater: function(){
	if(collect.isDown){
        getwatersound.play();
		havewater.text = "Water: ✓";
        wateronplayer = true;
	}
},

//function for dropping water
dropwater: function(){
	if(collect.isDown && wateronplayer == true){
        dropwatersound.play();
		havewater.text = "Water: ✗";
		wateronplayer = false;
        if(counter < 30 && counter >= 20){
            counter = 30;
        } else{
            counter = counter + 10;
        }
	}
},

//function to invisible the enemy when player eats it
killenemy: function(player, enemy){
    if(eat.isDown && wateronplayer == false){
        eatsound.play();
       	enemy.kill();
	    kill++;

	    //create blood effect when player kills enemy
        var deathEmitter = game.add.emitter(enemy.x, enemy.y, 400);
        deathEmitter.makeParticles('fragment');     // image used for particles
        deathEmitter.setAlpha(0.5, 3);              // set particle alpha (min, max)
        deathEmitter.minParticleScale = 0.1;        // set min/max particle size
        deathEmitter.maxParticleScale = 0.5;
        deathEmitter.setXSpeed(-800,800);         // set min/max horizontal speed
        deathEmitter.setYSpeed(-800,800);         // set min/max vertical speed
        deathEmitter.start(true, 2000, null, 400);  // (explode, lifespan, freq, quantity)
    }
},

//function to invisible enemies when an enemy gets to the oasis, while starting the gameover state
killenemies: function(oasis, enemy){
	enemy.kill();
	game.state.start('over');
	counter = 30;
	kill = 0;
	wateronplayer = false;
    bgm.pause();
    level = 60;
    level1 = 90;
},

//function to invisible the energy drink when player eats it
killenergy: function(player, energy){
	if(eat.isDown){
        drinksound.play();
		energy.kill();
	    kill = 0;
	}
},

};



