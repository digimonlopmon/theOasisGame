

var menuState = {
	create: function(){

		//create title screen background
        
        //title screen bgm looping
        
        //title screen text
		var nameLabel = game.add.text(170, 150, 'The Oasis', {font: '60px', fill: '#ffffff'});

		var startLabel = game.add.text(210, game.world.height-100, 'Press SPACE to start', {font: '20px', fill: '#fff'});

        //add space input for starting the game
		var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //press space to start the game
		space.onDown.addOnce(this.start, this);
	},

    start: function(){
    	//state changing
    	game.state.start('play');

    	//stop looping the title screen bgm

    }
};