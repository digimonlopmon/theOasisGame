var bgm;
var overState = {
	create: function(){

		//create title screen background
        
        //title screen bgm looping
        bgm = game.add.audio('die');
        bgm.loop = false;
        bgm.play();
        
        //title screen text
		var overLabel = game.add.text(300, 150, 'Gameover!', {font: '60px', fill: '#ffffff'});
        overLabel.anchor.setTo(0.5, 0.5);

		var restartLabel = game.add.text(300, game.world.height-100, 'Press ESC back to Menu', {font: '20px', fill: '#fff'});
        restartLabel.anchor.setTo(0.5, 0.5);

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