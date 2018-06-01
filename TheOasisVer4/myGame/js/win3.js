var win3State = {
	create: function(){

		//create title screen background
        
        //title screen bgm looping
        
        //title screen text
		var nameLabel = game.add.text(300, 150, 'Congratz! You have beat the game!', {font: '32px', fill: '#ffffff'});
        nameLabel.anchor.setTo(0.5, 0.5);

		var startLabel = game.add.text(300, game.world.height-100, 'Press ESC to back to Title Screen', {font: '20px', fill: '#fff'});
        startLabel.anchor.setTo(0.5, 0.5);

        //add ESC key to back to menu
        var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        //press esc to back to menu
        esc.onDown.addOnce(this.back, this);
	},

    back: function(){
        game.state.start('menu');
    },
};