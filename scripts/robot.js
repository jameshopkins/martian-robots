function Robot(command) {

    var position = command.split('\n'),
        gridCoordinates = position[0].split(' '),
        initialCardinalPoint = position[0].split(' ')[2];

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

    this.cardinalPoints = ['N', 'E', 'S', 'W'];

    this.currentPosition = {
        x: parseInt(gridCoordinates[0]),
        y: parseInt(gridCoordinates[1]),
        get readable () {
            return this.x + ',' + this.y;
        }
    };

    console.log('Robot activated at ' + this.currentPosition.readable + ' (facing ' + initialCardinalPoint + ')');
    this.startMovementSequence(initialCardinalPoint, position[1]);

}

Robot.prototype.moveForward = function(cardinalPoint) {

    var axis = {
        'N': {
            'name': 'north',
            'axis': ['y', 'positive'],
        },
        'E': {
            'name': 'east',
            'axis': ['x', 'positive'],
        },
        'S': {
            'name': 'south',
            'axis': ['y', 'negative'],
        },
        'W': {
            'name': 'west',
            'axis': ['x', 'negative']
        }
    };

    // Because you can't store an operator in a variable. 
    var signs = {
        positive: function(axis) { return ++this.currentPosition[axis]; }.bind(this),
        negative: function(axis) { return --this.currentPosition[axis]; }.bind(this)
    };

    var axis = axis[cardinalPoint]['axis'];
    signs[axis[1]](axis[0]);
    console.log('Robot has moved forward to ' + this.currentPosition.readable);

};

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
            pointIndex = --pointIndex;
            break;
        case 'R':
            pointIndex = ++pointIndex;
            break;
    };
    if (pointIndex >= this.cardinalPoints.length) {
        pointIndex = 0;
    };
    if (pointIndex == -1) {
        pointIndex = --this.cardinalPoints.length;
    }
    return this.cardinalPoints[pointIndex];
};

Robot.prototype.startMovementSequence = function(initialCardinalPoint, sequence) {
    var cardinalPoint = initialCardinalPoint;
    for (var i = 0; i < sequence.length; i++) {
        var movement = sequence.charAt(i);
        switch (movement) {
            case 'L':
            case 'R':
                cardinalPoint = this.createCircularBufferOfCardinalPoints(cardinalPoint, movement);
                console.log('Robot has ' + this.movementTypes[movement].message + ' (now facing ' + cardinalPoint + ')');
                break;
            case 'F':
                this.moveForward(cardinalPoint);
                break;
        }
    };
};
