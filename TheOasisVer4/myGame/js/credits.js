var credits = {
    create: function(){
        cds_label = game.add.text(300, 300, 'Credits', {font: '40px', fill: '#3399FF'});
        cds_label.stroke = '#000000';
        cds_label.strokeThickness = 8;
        cds_label.anchor.setTo(0.5, 0.5);

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