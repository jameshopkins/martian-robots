var terminal = (function(){

    var robots = [];

    /**
     * Since the requirement is for an initial single message that contains both
     * planet-specific (grid size) and robot-specific (movemement instructions), we
     * need to seperate these concerns explicitly, and publish them to their
     * relevant subscriber interfaces.
     *
     * @param {Object} instructions
     */
    function processInstructions(planet, instructions) {

        if (instructions.length >= 100) {
            throw new Error('The instructions provided are too long - 100 characters maximum.');
        };

        // Seperate the planet's grid size from the instructions for the robots.
        var instructions = instructions.split(/\n([\s\S]+)?/, 2);

        // Set the planet's grid size.
        planet.setGridSize(instructions[0]);
        mobilizeRobots(instructions[0], instructions[1]);

    };

    function mobilizeRobots(gridBoundaries, commands) {
        commands.split('\n\n').forEach(command => {
            robots.push(new Robot(gridBoundaries, command));
        });
    };
    return {
        createConnection: function(planet, instructions) {
            if (!planet instanceof Planet) {
                throw new Error('The planet you want to connect to isn\'t real - we suggest you study the solar system better!');
            }
            processInstructions(planet, instructions);
        },
        retrieveRobots: function() {
            return robots;
        }
    };
})();
