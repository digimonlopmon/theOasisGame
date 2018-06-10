var win3State = {
    create: function(){

        //create background
        var win = game.add.image(0, 0, 'success');
        
        //win sound effect
        var bgm = game.add.audio('win');
        bgm.loop = false;
        bgm.play();
        
        //win text
        var nameLabel = game.add.text(300, 150, 'Congratz! You have beat the game!', {font: '32px', fill: '#04A713'});
        nameLabel.anchor.setTo(0.5, 0.5);
        nameLabel.stroke = '#000000';
        nameLabel.strokeThickness = 8;

        //back to title screen
        back_label = game.add.text(300, 550, 'Back to Title Screen', {font: '24px', fill: '#3399FF'});
        back_label.stroke = '#000000';
        back_label.strokeThickness = 8;
        back_label.anchor.setTo(0.5, 0.5);
        back_label.inputEnabled = true;
        back_label.events.onInputOver.add(function () {
            back_label.fill = '#DA0404'
        });
        back_label.events.onInputOut.add(function () {
            back_label.fill = '#3399FF'
        });
        back_label.events.onInputUp.add(function () {
            game.state.start('menu');
            bgm.pause();
        });

    },
};