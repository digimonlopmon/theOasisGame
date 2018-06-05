var bgm;
var win;
var win3State = {
    create: function(){

        //create background
        win = game.add.image(0, 0, 'success');
        
        //bgm
        bgm = game.add.audio('win');
        bgm.loop = false;
        bgm.play();
        
        //text
        var nameLabel = game.add.text(300, 150, 'Congratz! You have beat the game!', {font: '32px', fill: '#04A713'});
        nameLabel.anchor.setTo(0.5, 0.5);

        //back to title screen
        back_label = game.add.text(300, 50, 'Back to Title Screen', {font: '24px', fill: '#3399FF'});
        back_label.stroke = '#000000';
        back_label.strokeThickness = 8;
        back_label.anchor.setTo(0.5, 0.5);
        back_label.inputEnabled = true;
        back_label.events.onInputUp.add(function () {
            game.state.start('menu');
            bgm.pause();
        });

    },
};