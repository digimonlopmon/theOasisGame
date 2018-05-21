//create the game
var game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');

//add all states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('tutorial', tutorialState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('over', overState);

//start from the boot state
game.state.start('boot');