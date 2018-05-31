var instruction = {
	create: function(){
		int_label = game.add.text(300, 300, 'Instruction', {font: '40px', fill: '#3399FF'});
        int_label.stroke = '#000000';
        int_label.strokeThickness = 8;
        int_label.anchor.setTo(0.5, 0.5);

        back_label = game.add.text(100, 50, 'Back', {font: '32px', fill: '#3399FF'});
        back_label.stroke = '#000000';
        back_label.strokeThickness = 8;
        back_label.anchor.setTo(0.5, 0.5);
        back_label.inputEnabled = true;
        back_label.events.onInputUp.add(function () {
            game.state.start('menu');
        });
	},
};