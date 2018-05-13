var counter = 30;
var text = 30;
var player;
var up;
var down;
var left;
var right;
var velocity;
var enemy;
var enemies;
var energy;
var energies;
var background;
var oasis;
var water;
var havewater;
var wateronplayer = false;
var kill = 0;
var timerstop = false;
var eat;
var drink;
var collect;

var playState = {
	create: function() {
	// place your assets
    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.image(300,300, 'background');
    background.anchor.setTo(0.5,0.5);
    background.scale.setTo(1.5,1.5);

<<<<<<< HEAD
    oasis = game.add.sprite(600, 600, 'tree');
=======
    oasis = game.add.image(610, 470, 'tree');
>>>>>>> 269cd3d735d00c6ad7d9548199d78320b3e501ff
    oasis.anchor.setTo(1,1);
    oasis.scale.setTo(1.5,1.5);
    oasis.enableBody = true;
    game.physics.arcade.enable(oasis);

    water = game.add.sprite(40, 40, 'water');
    water.anchor.setTo(0.5, 0.5);
    water.scale.setTo(1,1);
    water.enableBody = true;
    game.physics.arcade.enable(water);

    enemies = game.add.group();
    enemies.enableBody = true;
    game.physics.enable(enemies);

    game.time.events.loop(Phaser.Timer.SECOND * 2, this.createEnemy, this);

    energies = game.add.group();
    energies.enableBody = true;
    game.physics.enable(energies);

    game.time.events.loop(Phaser.Timer.SECOND * 15, this.createEnergy, this);

    player = game.add.sprite(300,500, 'player');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(1,1);
    player.enableBody = true;
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    havewater = game.add.text(16, 570, 'Water: None', { fontSize: '16px', fill: '#000' });

    text = game.add.text(550, 580, 'TimeLeft: 30', { font: "16px", fill: "#ffffff"});
    text.anchor.setTo(0.5, 0.5);

    game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    eat = game.input.keyboard.addKey(Phaser.Keyboard.X);
    drink = game.input.keyboard.addKey(Phaser.Keyboard.C);
    collect = game.input.keyboard.addKey(Phaser.Keyboard.Z);

},

update: function() {
	// run game loop
	oasis.visible = false;

    game.physics.arcade.overlap(player, enemies, this.killenemy, null, this);
    game.physics.arcade.overlap(oasis, enemies, this.killenemies, null, this);
    game.physics.arcade.overlap(player, energies, this.killenergy, null, this);
    game.physics.arcade.overlap(player, water, this.getwater, null, this);
    game.physics.arcade.overlap(player, oasis, this.dropwater, null, this);

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

    if(counter == 0){
    	game.state.start('over');
    	counter = 30;
    }

},

updateCounter: function(){
    counter--;
    text.setText('TimeLeft: ' + counter);
},

createEnemy: function(){
	enemy = enemies.create(game.world.randomX, 0, 'enemy');
	enemy.anchor.setTo(0.5,0.5);
    enemy.scale.setTo(2,2);
    enemy.enableBody = true;
    game.physics.arcade.enable(enemy);
    game.physics.arcade.moveToXY(enemy, 600, 600, 50);





    //Future work: There need to have a board check to remove those enemies after they walked over the game screen
    
},

createEnergy: function(){
    energy = energies.create(570, 30, 'energy');
    energy.anchor.setTo(0.5,0.5);
    energy.scale.setTo(1,1);
    energy.enableBody = true;
    game.physics.arcade.enable(energy);
},

getwater: function(){
	if(collect.isDown){
		havewater.text = "Water: obtained";
        wateronplayer = true;
	}
},

dropwater: function(){
	if(collect.isDown && wateronplayer == true){
		havewater.text = "Water: None";
		wateronplayer = false;
        counter = 30;
	}
},

killenemy: function(player, enemy){
    if(eat.isDown){
       	enemy.kill();
	    kill++;
    }
},

killenemies: function(oasis, enemy){
	enemy.kill();
	game.state.start('over');
	counter = 30;
},

killenergy: function(player, energy){
	if(drink.isDown){
		energy.kill();
	    kill = 0;
	}
},

};










