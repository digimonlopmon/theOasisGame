var menuState = {
	create: function(){

		//create title screen background
        var background = game.add.sprite(0, 0, 'title');
        background.animations.add('start', [0,1,2,3,4,5,6,7], 5, true);
        background.animations.play('start');
        
        //title screen bgm looping
        var bgm = game.add.audio('bgm');
    	bgm.volume = 0.2;
    	bgm.loop = true;
    	bgm.play();
        
        //Play: start the game
        ply_label = game.add.text(300, game.world.height-50, 'Start', {font: '32px', fill: '#3399FF'});
        ply_label.stroke = '#000000';
        ply_label.strokeThickness = 8;
        ply_label.anchor.setTo(0.5, 0.5);
        ply_label.inputEnabled = true;
        ply_label.events.onInputOver.add(function () {
            ply_label.fill = '#DA0404'
        });
        ply_label.events.onInputOut.add(function () {
            ply_label.fill = '#3399FF'
        });
        ply_label.events.onInputUp.add(function () {
            game.state.start('easy');
            bgm.pause();
        });

        //Instruction: open Instruction page
        int_label = game.add.text(100, game.world.height-50, 'Instructions', {font: '32px', fill: '#3399FF'});
        int_label.stroke = '#000000';
        int_label.strokeThickness = 8;
        int_label.anchor.setTo(0.5, 0.5);
        int_label.inputEnabled = true;
        int_label.events.onInputOver.add(function () {
            int_label.fill = '#DA0404'
        });
        int_label.events.onInputOut.add(function () {
            int_label.fill = '#3399FF'
        });
        int_label.events.onInputUp.add(function () {
            game.state.start('instruction');
            bgm.pause();
        });

        //Credits: citation page
        cds_label = game.add.text(520, game.world.height-50, 'Credits', {font: '32px', fill: '#3399FF'});
        cds_label.stroke = '#000000';
        cds_label.strokeThickness = 8;
        cds_label.anchor.setTo(0.5, 0.5);
        cds_label.inputEnabled = true;
        cds_label.events.onInputOver.add(function () {
            cds_label.fill = '#DA0404'
        });
        cds_label.events.onInputOut.add(function () {
            cds_label.fill = '#3399FF'
        });
        cds_label.events.onInputUp.add(function () {
            game.state.start('credits');
            bgm.pause();
        });


	},

};