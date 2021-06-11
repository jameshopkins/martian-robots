// Store the associations between cardinal directions and cartesian grid
// lines.
const cartesianDirectionsGrid = [
    ['N', 'y', 'positive'],
    ['E', 'x', 'positive'],
    ['S', 'y', 'negative'],
    ['W', 'x', 'negative']
]

let lostRobots = [];

const getCardinalPointIndex = cardinalPoint => cartesianDirectionsGrid.findIndex(data => data[0] === cardinalPoint);

const serializeCoordinates = ({x, y}) => `x: ${x}, y: ${y}`;

class Robot {
    constructor(gridBoundaries, {position, direction, movements}) {
        this.isLost = false;
        this.gridBoundaries = gridBoundaries;
        this.currentPosition = position;
        this.currentDirectionIndex = cartesianDirectionsGrid.findIndex(([dir]) => dir === direction);
    }

    // Calculates the next cardinal point, based on the current one and a direction (L or R).
    //
    // For example, if you're facing south, then turn left, you'll be facing east. Similarly,
    // if you're facing north, then turn left, you'll be facing west.

    turnDirection(nextDirection) {

        let cardinalPointIndex = this.currentDirectionIndex

        switch (nextDirection) {
            case 'L':
                cardinalPointIndex = --cardinalPointIndex;
                break;
            case 'R':
                cardinalPointIndex = ++cardinalPointIndex;
                break;
        }

        if (cardinalPointIndex >= cartesianDirectionsGrid.length) {
            cardinalPointIndex = 0;
        }

        if (cardinalPointIndex === -1) {
            cardinalPointIndex = cartesianDirectionsGrid.length - 1;
        }

        this.currentDirectionIndex = cardinalPointIndex

    }

    moveForward() {
        const [, axis, sign] = cartesianDirectionsGrid[this.currentDirectionIndex];
        const generateNewCoordinate = {
            positive: coord => this.currentPosition[coord] + 1,
            negative: coord => this.currentPosition[coord] - 1
        }

        const newCoordinate = generateNewCoordinate[sign](axis);
        const newPosition = {...this.currentPosition, [axis]: newCoordinate};

        // 1) Register the robot as lost if it strays beyond the upper-right
        //    coordinates of the reactangular world.
        // 2) Since the lower-left coordinates are assumed to be 0, 0, register the
        //    robot as lost if it strays into the negative line of either axis on
        //    the Cartesian grid.

        if (newCoordinate > this.gridBoundaries[axis] || newCoordinate < 0) {
            const serialisedNewPosition = serializeCoordinates(newPosition)

            if (lostRobots.find(position => position === serialisedNewPosition)) {
                return;
            }
            lostRobots.push(serialisedNewPosition)
        } else {
            // Only move the robot if that movement results in the robot being
            // positioned within the grid boundaries.
            this.currentPosition = newPosition;
        }
    }
}

const moveForward = (gridBoundaries, cardinalPoint, currentPosition) => {
    const [, axis, sign] = cartesianDirectionsGrid[getCardinalPointIndex(cardinalPoint)];
    const generateNewCoordinate = {
        positive: coord => currentPosition[coord] + 1,
        negative: coord => currentPosition[coord] - 1
    }

    const newCoordinate = generateNewCoordinate[sign](axis);
    const newPosition = {...currentPosition, [axis]: newCoordinate};
};

module.exports = { Robot }