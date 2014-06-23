/**
 * Creates a robot as well as handling all of it's movement.
 *
 * @constructor
 * @param {String} gridBoundaries - The permitted grid boundaries in which the
 *                 robot is allowed to move around in.
 * @param {String} command - The instructions detailing the movement sequence.
 */
function Robot(gridBoundaries, command) {

    var command = command.split('\n'),
        gridCoordinates = command[0].split(' '),
        initialCardinalPoint = command[0].split(' ')[2],
        gridBoundaries = gridBoundaries.split(' ');

    this.isLost = false;

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

    this.gridBoundaries = {
        'x': gridBoundaries[0],
        'y': gridBoundaries[1]
    };

    this.currentPosition = {
        x: parseInt(gridCoordinates[0]),
        y: parseInt(gridCoordinates[1]),
        get rendered() {
            return this.x + ',' + this.y;
        }
    };

    console.log('Robot activated at ' + this.currentPosition.rendered + ' (facing ' + initialCardinalPoint + ')');
    this.startMovementSequence(initialCardinalPoint, command[1]);

};

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
    },

    // Because you can't store an operator in a variable.
    signs = {
        positive: function(axis) { return this.currentPosition[axis] + 1; }.bind(this),
        negative: function(axis) { return this.currentPosition[axis] - 1; }.bind(this)
    },

    requiredAxis = axis[cardinalPoint]['axis'],

    newCoordinate = signs[requiredAxis[1]](requiredAxis[0]);

    if (newCoordinate <= this.gridBoundaries[requiredAxis[0]]) {
        // Only move the robot if that movement results in the robot being
        // positioned within the grid boundaries.
        this.currentPosition[requiredAxis[0]] = newCoordinate;
        console.log('Robot has moved forward to ' + this.currentPosition.rendered);
    }
    else {
        // If a previous robot has dropped off the world from the same point
        // the current robot has been instructed to move from, then ignore the
        // current command.
        if (lostRobots.indexOf(this.currentPosition.rendered) > -1) return;

        // A robot only becomes lost if it drops off the world from a position
        // where a previous robot hasn't been lost from.
        this.isLost = true;
        console.log('Robot is lost!');
        if (lostRobots.indexOf(this.currentPosition.rendered) === -1) {
            lostRobots.push(this.currentPosition.rendered);
        }
    }

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
        pointIndex = this.cardinalPoints.length - 1;
    }
    return this.cardinalPoints[pointIndex];
};

Robot.prototype.startMovementSequence = function(initialCardinalPoint, sequence) {
    var cardinalPoint = initialCardinalPoint;
    for (var i = 0; i < sequence.length; i++) {

        // Stop processing the sequence if the robot becomes lost.
        if (this.isLost) return;

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
