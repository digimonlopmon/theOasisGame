var bgm;
var over;
var overState = {
	create: function(){

		//create background
        over = game.add.image(0, 0, 'gameover');
        
        //bgm
        bgm = game.add.audio('die');
        bgm.loop = false;
        bgm.play();
        
        //text
		var overLabel = game.add.text(300, 150, 'Gameover!', {font: '60px', fill: '#DA0404'});
        overLabel.anchor.setTo(0.5, 0.5);

        //back to title screen
        back_label = game.add.text(300, 50, 'Back to Title Screen', {font: '24px', fill: '#3399FF'});
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