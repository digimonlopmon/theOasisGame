var counter = 30; //Counter for Oasis's life
var text = 30; //text for the counter
var level = 60; //counter for tutorial
var leveltext = 60; //counter text for tutorial
var level1 = 120; //counter for level 1
var leveltext1 = 120; //counter text for level 1
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
var havewater; //text to show if player has water or not
var wateronplayer = false; //check if player has water
var kill = 0; //number of enemies player killed
var eat; //key for player to eat enemy and energy drink
var collect; //key for player to get and drop water
var bgm; //bgm var

var playState = {
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

    //create water source at top left corner
    water = game.add.sprite(40, 40, 'water');
    water.anchor.setTo(0.5, 0.5);
    water.scale.setTo(1,1);
    water.enableBody = true;
    game.physics.arcade.enable(water);

    //create enemies
    enemies = game.add.group();
    enemies.enableBody = true;
    game.physics.enable(enemies);
    game.time.events.loop(Phaser.Timer.SECOND * 3, this.createEnemy, this);

    //create energy drinks
    energies = game.add.group();
    energies.enableBody = true;
    game.physics.enable(energies);
    game.time.events.loop(Phaser.Timer.SECOND * 15, this.createEnergy, this);

    //create the player
    player = game.add.sprite(300,500, 'player');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(1,1);
    player.enableBody = true;
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    //in game text shows if water has been obtained
    havewater = game.add.text(16, 570, 'Water: None', { fontSize: '20px', fill: '#000' });

    //countdown timer for the oasis's life
    text = game.add.text(530, 580, 'TimeLeft: 30', { font: "20px", fill: "#ffffff"});
    text.anchor.setTo(0.5, 0.5);
    game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

    //level counter
    leveltext1 = game.add.text(300, 30, 'Stage time left: 120', { font: "24px", fill: "#000"});
    leveltext1.anchor.setTo(0.5, 0.5);
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

    //if Oasis's life runs out, start the gameover state
    if(counter == 0){
    	game.state.start('over');
    	counter = 30;
    	kill = 0;
    	wateronplayer = false;
        bgm.pause();
        level = 60;
        level1 = 120;
    }

    //start win state if the level counter runs out
    if(level1 == 0){
        game.state.start('win');
        counter = 30;
        kill = 0;
        wateronplayer = false;
        bgm.pause();
        level = 60;
        level1 = 120;
    }

},

//the counter function for oasis's life
updateCounter: function(){
    counter--;
    text.setText('TimeLeft: ' + counter);
},

//the level counter function
levelCounter: function(){
    level1--;
    leveltext1.setText('Stage time left: ' + level1);
},

//function for creating enemy
createEnemy: function(){
	enemy = enemies.create(game.world.randomX, 0, 'enemy');
	enemy.anchor.setTo(0.5,0.5);
    enemy.scale.setTo(2,2);
    enemy.enableBody = true;
    game.physics.arcade.enable(enemy);
    game.physics.arcade.moveToXY(enemy, 600, 600, game.rnd.integerInRange(30, 60));
    //Future work: There need to have a board check to remove those enemies after they walked over the game screen
    
},

//function for creating energy drink
createEnergy: function(){
    energy = energies.create(game.world.randomX, game.world.randomY, 'energy');
    energy.anchor.setTo(0.5,0.5);
    energy.scale.setTo(1,1);
    energy.enableBody = true;
    game.physics.arcade.enable(energy);
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
        counter = 30;
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
    level1 = 120;
},

//function to invisible the energy drink when player eats it
killenergy: function(player, energy){
	if(eat.isDown){
		energy.kill();
	    kill = 0;
	}
},

};










