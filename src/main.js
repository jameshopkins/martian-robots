const { compose, drop, map, split, take, move } = require('rambda');

// Parse raw string input into a sane structure

const parseRawInput = input => {
    const configurationDelimeter = '\n';

    const getGridSize = compose(
        split(' '),
        take(input.indexOf(configurationDelimeter))
    );

    const parseGridStartingPositions = compose(
        ([initialPositions, movements]) => ({
            initialPosition: initialPositions.split(' '),
            movements: movements.split('')
        }),
        split(configurationDelimeter)
    );

    const getInstructions = compose(
        map(parseGridStartingPositions),
        // Split the instruction sets apart
        split('\n\n'),
        // Take everthing *after* the grid size delimiter
        drop(input.indexOf(configurationDelimeter) + 1)
    )

    return {
        gridSize: getGridSize(input),
        instructions: getInstructions(input)
    }
}

module.exports = { parseRawInput }