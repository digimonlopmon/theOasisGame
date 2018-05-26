var counter = 30; //Counter for Oasis's life
var text = 30; //text for the counter
var level = 60; //counter for tutorial
var leveltext = 60; //counter text for tutorial
var level1 = 90; //counter for level 1
var leveltext1 = 90; //counter text for level 1
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
var water; //water var
var warning; //draining warning
var rock1; //obstacle var
var havewater; //text to show if player has water or not
var wateronplayer = false; //check if player has water
var kill = 0; //number of enemies player killed
var eat; //key for player to eat enemy and energy drink
var collect; //key for player to get and drop water
var bgm; //bgm var

var tutorialState = {
	create: function() {
	//enable arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //create bgm
    bgm = game.add.audio('bgm');
    bgm.volume = 0.5;
    bgm.loop = true;
    bgm.play();
    
    //create the background map
    background = game.add.image(300,300, 'background');
    background.anchor.setTo(0.5,0.5);
    background.scale.setTo(1.5,1.5);

    //create the oasis at bottom right corner
    oasis = game.add.sprite(600, 600, 'tree');
    oasis.anchor.setTo(1,1);
    oasis.scale.setTo(1.5,1.5);
    oasis.enableBody = true;
    game.physics.arcade.enable(oasis);

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
    havewater = game.add.text(16, 570, 'Water: None', { fontSize: '20px', fill: '#000' });

    //countdown timer for the oasis's life
    text = game.add.text(300, 580, 'OasisLife : 30', { font: "20px", fill: "#ffffff"});
    text.anchor.setTo(0.5, 0.5);
    game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

    //level counter
    leveltext = game.add.text(300, 30, 'Stage time left: 60', { font: "24px", fill: "#000"});
    leveltext.anchor.setTo(0.5, 0.5);
    game.time.events.loop(Phaser.Timer.SECOND, this.levelCounter, this);

    //create movement arrow keys and action keys
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    eat = game.input.keyboard.addKey(Phaser.Keyboard.X);
    collect = game.input.keyboard.addKey(Phaser.Keyboard.Z);

},

update: function() {

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

//the counter function for oasis's life
updateCounter: function(){
    counter--;
    text.setText('OasisLife: ' + counter);
},

//the level counter function 
levelCounter: function(){
    level--;
    leveltext.setText('Stage time left: ' + level);
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
    //Future work: There need to have a board check to remove those enemies after they walked over the game screen
    
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
		havewater.text = "Water: obtained";
        wateronplayer = true;
	}
},

//function for dropping water
dropwater: function(){
	if(collect.isDown && wateronplayer == true){
		havewater.text = "Water: None";
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
       	enemy.kill();
	    kill++;
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
		energy.kill();
	    kill = 0;
	}
},

};










