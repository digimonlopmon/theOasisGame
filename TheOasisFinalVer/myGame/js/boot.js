var bootState = {
	create: function(){
		//enable game physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //state changing
		game.state.start('load');
	}
};