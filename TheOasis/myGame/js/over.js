var overState = {
	create: function(){

		//create title screen background
        
        //title screen bgm looping
        
        //title screen text
		var overLabel = game.add.text(170, 150, 'Gameover!', {font: '60px', fill: '#ffffff'});

		var restartLabel = game.add.text(210, game.world.height-100, 'Press SPACE back to Menu', {font: '20px', fill: '#fff'});

        //add space input for starting the game
		var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //press space to start the game
		space.onDown.addOnce(this.restart, this);
	},

    restart: function(){
    	//state changing
    	game.state.start('menu');

    	//stop looping the title screen bgm

    }
};