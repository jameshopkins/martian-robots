const test = require('ava');

const { parseRawInput } = require('../src/input-parsing.js');
const robot = require('../src/robot.js');
const { Robot } = require('../src/robot.js');

test('Parse raw input into a sane structure', t => {
    const rawInput = '5 3\\n1 1 E\\nRFRFRFRF\\n\\n3 2 N\\nFRRFLLFFRRFLL\\n\\n0 3 W\\nLLFFFLFLFL';
    const expected = {
        gridBoundaries: {x: 5, y: 3},
        instructions: [
            {
                position: {x: 1, y: 1},
                direction: 'E',
                movements: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F' ]
            }, {
                position: {x: 3, y: 2},
                direction: 'N',
                movements: ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L']
            }, {
                position: {x: 0, y: 3},
                direction: 'W',
                movements: ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L' ]
            }
        ]
    }
    t.deepEqual(parseRawInput(rawInput), expected);
});

test('Calculate next cardinal point data', t => {
    const instruction = {
        position: {x:1, y:1},
        direction: 'E',
        movements: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F' ]
    }

    const robot = new Robot({x: 5,y: 3}, instruction);

    robot.turnDirection('L');
    t.is(robot.currentDirectionIndex, 0);

    robot.turnDirection('R');
    t.is(robot.currentDirectionIndex, 1);

    robot.turnDirection('R');
    t.is(robot.currentDirectionIndex, 2);

    robot.turnDirection('L');
    t.is(robot.currentDirectionIndex, 1);
})

const createRobotAndMoveForward = (direction, position, movements = []) => {
    const instruction = {
        position,
        direction,
        movements
    }
    return new Robot({x: 5, y: 3}, instruction);
}

test('Moving forward into a valid space', t => {
    // Happy paths
    const robot1 = createRobotAndMoveForward('S', {x: 1, y: 1});
    robot1.moveForward();
    t.deepEqual(robot1.currentPosition, { y: 0, x: 1 });

    const robot2 = createRobotAndMoveForward('N', {x: 2, y: 1});
    robot2.moveForward();
    t.deepEqual(robot2.currentPosition, { y: 2, x: 2 });
    robot2.moveForward();
    t.deepEqual(robot2.currentPosition, { y: 3, x: 2 });
})

test('Moving forward into an invalid space', t => {
    // Lets go off grid (by going into negative-coordinate land)!
    const robot = createRobotAndMoveForward('S', {x: 2, y: 1});
    robot.moveForward();
    // The robot can move because it can move to a valid position
    t.deepEqual(robot.currentPosition, { y: 0, x: 2 });
    // The robot can't move from the current position because it'd place it on a negative coordinate
    robot.moveForward()
    t.truthy(robot.isLost)
})

test('Attempting to move forward into an invalid space where a previous robot has been lost', t => {
    // 1) Make robot1 get lost.
    // 2) Check robot2 doesn't become lost
    const robot1 = createRobotAndMoveForward('N', {x: 2, y: 3});
    robot1.moveForward();
    t.truthy(robot1.isLost);

    const robot2 = createRobotAndMoveForward('N', {x: 2, y: 3});
    robot2.moveForward()
    t.falsy(robot2.isLost); // robot2 refuses to get lost!
    t.deepEqual(robot2.currentPosition, {x: 2, y: 3})
})
