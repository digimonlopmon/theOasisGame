var menuState = {
	create: function(){

		//create title screen background
        var background = game.add.sprite(0, 0, 'title');
        background.scale.setTo(6, 6);
        background.animations.add('start', [0,1,2,3,4,5,6,7], 5, true);
        background.animations.play('start');
        
        //title screen bgm looping
        
        //title screen text
		var startLabel = game.add.text(180, game.world.height-80, 'Press SPACE to Start', {font: '28px', fill: '#000'});

        //add space input for starting the game
		var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //press space to start the game
		space.onDown.addOnce(this.start, this);
	},

    start: function(){
    	//state changing
    	game.state.start('tutorial');

    	//stop looping the title screen bgm

    }
};