//create the game
var game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');

//add all states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('instruction', instruction);
game.state.add('instruction2', instruction2);
game.state.add('credits', credits);
game.state.add('easy', easyState);
game.state.add('medium', mediumState);
game.state.add('hard', hardState);
game.state.add('win1', win1State);
game.state.add('win2', win2State);
game.state.add('win3', win3State);
game.state.add('over', overState);

//start from the boot state
game.state.start('boot');