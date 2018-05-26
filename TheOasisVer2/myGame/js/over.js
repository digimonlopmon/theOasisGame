var bgm;
var overState = {
	create: function(){

		//create title screen background
        
        //title screen bgm looping
        bgm = game.add.audio('die');
        bgm.loop = false;
        bgm.play();
        
        //title screen text
		var overLabel = game.add.text(170, 150, 'Gameover!', {font: '60px', fill: '#ffffff'});

		var restartLabel = game.add.text(210, game.world.height-100, 'Press ESC back to Menu', {font: '20px', fill: '#fff'});

        //add space input for starting the game
		var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        //press space to start the game
		esc.onDown.addOnce(this.restart, this);

	},

    restart: function(){
    	//state changing
    	game.state.start('menu');
        
        bgm.pause();
    	//stop looping the title screen bgm

    }
};