function Robot(command) {

    var position = command.split('\n');

    this.movementTypes = {
        L: {
            direction: 'left',
            message: 'turned left'
        },
        R: {
            direction: 'right',
            message: 'turned right'
        },
        F: {
            direction: 'forward',
            message: 'moved forward'
        }
    };

    /*this.cardinalPoints = {
        'N': 'north',
        'E': 'east',
        'S': 'south',
        'W': 'west'
     };*/

    this.cardinalPoints = ['N', 'E', 'S', 'W'];

    this.gridCoordinates = position[0].split(' ');

    var initialCardinalPoint = this.gridCoordinates[2];

    //console.log('Robot activated, positioned facing ' + this.cardinalPoints[this.initialCardinalPoint]);
    console.log('Robot activated');

    this.startMovementSequence(initialCardinalPoint, position[1]);

}

/**
 * An implementation of a circular buffer to allow us to move between cardinal
 * points with ease.
 * 
 * @param {String} cardinal point
 * @param {String} direction - either 'L' or 'R'
 */
Robot.prototype.createCircularBufferOfCardinalPoints = function(point, direction) {
    var pointIndex = this.cardinalPoints.indexOf(point);

    switch (direction) {
        case 'L':
            pointIndex = pointIndex - 1;
            break;
        case 'R':
            pointIndex = pointIndex + 1;
            break;
    };
    if (pointIndex >= this.cardinalPoints.length) {
        pointIndex = 0;
    };
    if (pointIndex == -1) {
        pointIndex = this.cardinalPoints.length - 1;
    }
    return this.cardinalPoints[pointIndex];
};

Robot.prototype.startMovementSequence = function(initialCardinalPoint, sequence) {
    var cardinalPoint = initialCardinalPoint;
    for ( var i = 0; i < 3; i++ ) {
        var movement = sequence.charAt(i);
        if (movement !== 'F') {
            cardinalPoint = this.createCircularBufferOfCardinalPoints(cardinalPoint, movement);
        }
        else {
            console.log(cardinalPoint);
        }
        //console.log(cardinalPoint);
    };
};
