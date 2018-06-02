var bgm;
var win2State = {
    create: function(){

        //create title screen background
        
        //title screen bgm looping
        bgm = game.add.audio('win');
        bgm.loop = false;
        bgm.play();
        
        //title screen text
        var nameLabel = game.add.text(300, 150, 'You successfully protected the Oasis!', {font: '32px', fill: '#04A713'});
        nameLabel.anchor.setTo(0.5, 0.5);

        //back to title screen
        back_label = game.add.text(120, game.world.height-100, 'Back to Title Screen', {font: '24px', fill: '#3399FF'});
        back_label.stroke = '#000000';
        back_label.strokeThickness = 8;
        back_label.anchor.setTo(0.5, 0.5);
        back_label.inputEnabled = true;
        back_label.events.onInputUp.add(function () {
            game.state.start('menu');
            bgm.pause();
        });

        //next level
        next_label = game.add.text(500, game.world.height-100, 'Start next level', {font: '24px', fill: '#3399FF'});
        next_label.stroke = '#000000';
        next_label.strokeThickness = 8;
        next_label.anchor.setTo(0.5, 0.5);
        next_label.inputEnabled = true;
        next_label.events.onInputUp.add(function () {
            game.state.start('hard');
            bgm.pause();
        });
    },
};