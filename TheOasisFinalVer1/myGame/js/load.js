var loadState = {
	preload: function(){

		//text to show loading
        var loadingLabel = game.add.text(80, 150, 'loading...',{fon: '30px Courier', fill: '#ffffff'});
        
        //load game assets
        game.load.atlasJSONHash('player', 'assets/img/player.png', 'assets/img/player.json');
        game.load.atlasJSONHash('enemy', 'assets/img/enemy.png', 'assets/img/enemy.json');
        game.load.image('oasis', 'assets/img/oasis.png');
        game.load.image('dead', 'assets/img/Dead.png');
        game.load.image('background', 'assets/img/Background.png');
        game.load.image('energy', 'assets/img/energy.png');
        game.load.image('water', 'assets/img/water.png');
        game.load.image('rock', 'assets/img/Rock.png');
        game.load.image('warning', 'assets/img/warning.png');
        game.load.atlasJSONHash('title', 'assets/img/menu.png', 'assets/img/menu.json');
        game.load.image('success', 'assets/img/win.png');
        game.load.image('gameover', 'assets/img/gameover.png');
        game.load.image('fragment', 'assets/img/fragment.png');
        game.load.image('instruction', 'assets/img/Instructions.png');
        game.load.image('credits', 'assets/img/Credits.png');
        game.load.audio('die', 'assets/audio/die.wav');
        game.load.audio('win', 'assets/audio/win.wav');
        game.load.audio('eat', 'assets/audio/eat.mp3');
        game.load.audio('drink', 'assets/audio/drink.wav');
        game.load.audio('getwater', 'assets/audio/getwater.wav');
        game.load.audio('dropwater', 'assets/audio/dropwater.wav');
        game.load.audio('bgm', 'assets/audio/bgm.mp3');
        game.load.audio('bgm1', 'assets/audio/bgm1.wav');
        game.load.audio('bgm2', 'assets/audio/bgm2.wav');

        
	},

	create: function(){
		//state changing
         game.state.start('menu');
	}
};