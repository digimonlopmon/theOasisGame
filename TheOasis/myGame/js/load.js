var loadState = {
	preload: function(){

		//text to show loading
        var loadingLabel = game.add.text(80, 150, 'loading...',{fon: '30px Courier', fill: '#ffffff'});
        
        //load game assets
        game.load.spritesheet('player', 'assets/img/player.png');
        game.load.spritesheet('enemy', 'assets/img/enemy.png');
        game.load.image('tree', 'assets/img/Tree.png');
        game.load.image('Dead', 'assets/img/Dead.png');
        game.load.image('background', 'assets/img/SAND.png');
	},

	create: function(){
		//state changing
         game.state.start('menu');
	}
};