const test = require('ava');

const { parseRawInput } = require('../src/main.js');
const { calculateNextCardinalPointData } = require('../src/robot.js');

test('Parse raw input into a sane structure', t => {
    const rawInput = '5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL';
    const expected = {
        gridSize: ['5', '3'],
        instructions: [
            {
                initialPosition: ['1', '1', 'E'],
                movements: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F' ]
            }, {
                initialPosition: ['3', '2', 'N'],
                movements: ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L']
            }, {
                initialPosition: ['0', '3', 'W'],
                movements: ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L' ]
            }
        ]
    }
    t.deepEqual(parseRawInput(rawInput), expected);
});

test('Calculate next cardinal point data', t => {
    t.is(calculateNextCardinalPointData('S', 'L'), 1);
    t.is(calculateNextCardinalPointData('S', 'R'), 3);
    t.is(calculateNextCardinalPointData('W', 'L'), 2);
    t.is(calculateNextCardinalPointData('N', 'L'), 3);
})