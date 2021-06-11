const test = require('ava');

const { parseRawInput } = require('../src/input-parsing.js');
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

test('Move forward correctly', t => {

    const instruction = {
        position: {x: 1, y:1},
        direction: 'S',
        movements: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F' ]
    }

    const robot1 = new Robot({x: 5, y: 3}, instruction);

    // Happy path
    robot1.moveForward();
    t.deepEqual(robot1.currentPosition, { y: 0, x: 1 });

    // t.deepEqual(moveForward({x: 2, y: 2}, 'S', {x: 1, y: 1}), { y: 0, x: 1 });
    // t.deepEqual(moveForward({x: 2, y: 2}, 'W', {x: 1, y: 1}), { y: 1, x: 0 });
    // t.deepEqual(moveForward({x: 2, y: 2}, 'N', {x: 1, y: 0}), { y: 1, x: 1 });

    // // Abort the robot if we know that by moving forward, the robot will be lost
    // moveForward({x: 2, y: 2}, 'N', {x: 1, y: 2});
    // // Since the second robot would become lost, the current instruction is ignored
    // t.assert(typeof moveForward({x: 2, y: 2}, 'N', {x: 1, y: 2}) === 'undefined');
})