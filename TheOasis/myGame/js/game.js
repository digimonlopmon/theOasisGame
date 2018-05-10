//create the game
var game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');

//add all states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

//start from the boot state
game.state.start('boot');