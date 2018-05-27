var loadState = {
	preload: function(){

		//text to show loading
        var loadingLabel = game.add.text(80, 150, 'loading...',{fon: '30px Courier', fill: '#ffffff'});
        
        //load game assets
        game.load.atlasJSONHash('player', 'assets/img/player.png', 'assets/img/player.json');
        game.load.atlasJSONHash('enemy', 'assets/img/enemy.png', 'assets/img/enemy.json');
        game.load.image('tree', 'assets/img/Tree.png');
        game.load.image('Dead', 'assets/img/Dead.png');
        game.load.image('background', 'assets/img/Background.png');
        game.load.image('energy', 'assets/img/energy.png');
        game.load.image('water', 'assets/img/water.png');
        game.load.image('rock', 'assets/img/Rock.png');
        game.load.image('warning', 'assets/img/warning.png');
        game.load.atlasJSONHash('title', 'assets/img/menu.png', 'assets/img/menu.json');
        game.load.audio('die', 'assets/audio/die.wav');
        game.load.audio('bgm', 'assets/audio/bgm.mp3');
        
	},

	create: function(){
		//state changing
         game.state.start('menu');
	}
};