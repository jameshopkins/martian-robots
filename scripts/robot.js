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

    // Store the associations between cardinal directions and cartesian grid
    // lines.
    this.cardinalDirectionsGrid = [
        ['N', 'y', 'positive'],
        ['E', 'x', 'positive'],
        ['S', 'y', 'negative'],
        ['W', 'x', 'negative']
    ];

    /**
     * Retrieve data associating cardinal direction and cartesian grid lines.
     *
     * @param {String} cardinalPoint
     * @return {String|Array} The position of the cardinal point within our
     *         circular buffer.
     */
    this.getCardinalDirectionData = function(cardinalPoint) {
        var position = this.cardinalDirectionsGrid.map((el) => el[0]).indexOf(cardinalPoint);
        return [position, this.cardinalDirectionsGrid[position]];
    }

    this.gridBoundaries = {
        'x': gridBoundaries[0],
        'y': gridBoundaries[1]
    };

    // Updates after every legal movement.
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

/**
 * Processes an instruction to move forward.
 *
 * @param {String} cardinalPoint
 */
Robot.prototype.moveForward = function(cardinalPoint) {

    // Because you can't store an operator in a variable.
    signs = {
        positive: function(axis) { return this.currentPosition[axis] + 1; }.bind(this),
        negative: function(axis) { return this.currentPosition[axis] - 1; }.bind(this)
    };

    var [, requiredAxis] = this.getCardinalDirectionData(cardinalPoint);

    newCoordinate = signs[requiredAxis[2]](requiredAxis[1]);

    if (newCoordinate <= this.gridBoundaries[requiredAxis[1]]) {
        // Only move the robot if that movement results in the robot being
        // positioned within the grid boundaries.
        this.currentPosition[requiredAxis[1]] = newCoordinate;
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

        // Make sure the lost robot log is populated with only unique values.
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
Robot.prototype.createCircularBufferOfCardinalPoints = function(cardinalPoint, direction) {
    var [pointIndex, ] = this.getCardinalDirectionData(cardinalPoint);

    switch (direction) {
        case 'L':
            pointIndex = --pointIndex;
            break;
        case 'R':
            pointIndex = ++pointIndex;
            break;
    };
    if (pointIndex >= this.cardinalDirectionsGrid.length) {
        pointIndex = 0;
    };
    if (pointIndex == -1) {
        pointIndex = this.cardinalDirectionsGrid.length - 1;
    }

    return this.cardinalDirectionsGrid[pointIndex][0];
};

/**
 * Processes the each individual movement instruction within a command sequence.
 *
 * @param {String} initialCardinalPoint
 * @param {String} sequence
 */
Robot.prototype.startMovementSequence = function(initialCardinalPoint, sequence) {
    var cardinalPoint = initialCardinalPoint;

    for (let i = 0; i < sequence.length; i++) {

        // Stop processing the sequence if the robot becomes lost.
        if (this.isLost) return;

        let movement = sequence.charAt(i);
        switch (movement) {
            case 'L':
            case 'R':
                let movementTypes = { L: 'left', R: 'right' };
                cardinalPoint = this.createCircularBufferOfCardinalPoints(cardinalPoint, movement);
                console.log('Robot has ' + movementTypes[movement] + ' (now facing ' + cardinalPoint + ')');
                break;
            case 'F':
                this.moveForward(cardinalPoint);
                break;
        }

    };

};
