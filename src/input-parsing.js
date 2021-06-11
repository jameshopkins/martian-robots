const { compose, drop, map, split, take, move } = require('rambda');

// Parse raw string input into a sane structure

const parseRawInput = input => {
    const configurationDelimeter = '\\n';

    const getGridBoundaries = compose(
        ([x, y]) => ({x, y}),
        map(parseInt),
        split(' '),
        take(input.indexOf(configurationDelimeter))
    );

    const parseGridStartingPositions = compose(
        ([initial, movements]) => {
            const [x, y, direction] = initial.split(' ')
            return {
                position: {x: parseInt(x), y: parseInt(y)},
                direction: direction,
                movements: movements.split('')
            }
        },
        split(configurationDelimeter)
    );

    const getInstructions = compose(
        map(parseGridStartingPositions),
        // Split the instruction sets apart
        split('\\n\\n'),
        // Take everything *after* the grid size delimiter
        drop(input.indexOf(configurationDelimeter) + 2)
    )

    return {
        gridBoundaries: getGridBoundaries(input),
        instructions: getInstructions(input)
    }
}

module.exports = { parseRawInput }