const { parseRawInput } = require('./input-parsing')
const { Robot } = require('./robot')

const { gridBoundaries, instructions } = parseRawInput(process.argv[2]);

instructions.forEach(instruction => {
    const robot = new Robot(gridBoundaries, instruction);
    robot.startMovementSequence()
})