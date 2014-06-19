function Robot(command) {

    var position = command.split('\n');

    this.commands = {
        L: 'turned left',
        R: 'turned right',
        F: 'moved forward'
    };
    this.gridCoordinates = position[0].split(' ');

    this.startMovementSequence(position[1]);

}

Robot.prototype.startMovementSequence = function(sequence) {
    for ( var i = 0; i < sequence.length; i++ ) {
        var movement = sequence.charAt(i);
        console.log(movement);
    };
};
