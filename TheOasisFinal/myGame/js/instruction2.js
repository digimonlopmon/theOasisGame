var instruction2 = {
	create: function(){
        //create the instruction2 image
		var background = game.add.image(0, 0, 'instructions');

        //create the 'Prev' button
        prev_label = game.add.text(50, 30, 'Prev', {font: '32px', fill: '#3399FF'});
        prev_label.stroke = '#000000';
        prev_label.strokeThickness = 8;
        prev_label.anchor.setTo(0.5, 0.5);
        prev_label.inputEnabled = true;
        prev_label.events.onInputOver.add(function () {
            prev_label.fill = '#DA0404'
        });
        prev_label.events.onInputOut.add(function () {
            prev_label.fill = '#3399FF'
        });
        prev_label.events.onInputUp.add(function () {
            game.state.start('instruction');
        });

        //create the 'back' button
        back_label = game.add.text(550, 30, 'Back', {font: '32px', fill: '#3399FF'});
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
        });
	},
};