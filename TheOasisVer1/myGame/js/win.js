var winState = {
	create: function(){

		//create title screen background
        
        //title screen bgm looping
        
        //title screen text
		var nameLabel = game.add.text(85, 150, 'You successfully protect the Oasis', {font: '32px', fill: '#ffffff'});

		var startLabel = game.add.text(80, game.world.height-100, 'Press SPACE to start next level or ESC to back to menu', {font: '20px', fill: '#fff'});

        //add space input for starting the game
		var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        //press space to start the game
		space.onDown.addOnce(this.start, this);
        esc.onDown.addOnce(this.back, this);
	},

    start: function(){
    	//state changing
    	game.state.start('play');

    	//stop looping the title screen bgm

    },

    back: function(){
        game.state.start('menu');
    },
};