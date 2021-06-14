// Parse raw string input into a sane structure

const configurationDelimeter = '\\n';

const getGridBoundaries = input => {
    const [x, y] = input
        .substr(0, input.indexOf(configurationDelimeter))
        .split(' ')
        .map(f => parseInt(f))

    return {x, y}
}

const parseGridStartingPositions = input => {
    const [initial, movements] = input.split(configurationDelimeter);
    const [x, y, direction] = initial.split(' ')
    return {
        position: {x: parseInt(x), y: parseInt(y)},
        direction: direction,
        movements: movements.split('')
    }
}

const getInstructions = input =>
    input
        .substr(input.indexOf(configurationDelimeter) + 2)
        .split('\\n\\n')
        .map(parseGridStartingPositions)

const parseRawInput = input => {

    return {
        gridBoundaries: getGridBoundaries(input),
        instructions: getInstructions(input)
    }
}

module.exports = { parseRawInput }