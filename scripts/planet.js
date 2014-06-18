/**
 * Provides us with an interface to set up a suitable enviroment,
 * so that robots that move around on it's surface.
 * 
 * Individual planets inherit these interfaces through Object.create() since we
 * want to control when instantiation of that constructor happens.
 * 
 * @constructor
 * @param {Array} gridCoordinates
 */
function Planet(instructions) {

    // We never want to control the movements of robots on multiple planets
    // concurrently.
    if (Planet.instance)
        return Planet.instance;
    Planet.instance = this;

    /*this.gridCoordinates = {
        width: gridCoordinates[0],
        height: gridCoordinates[1]
    };*/
    this.processInstructions(instructions);
    //this.mapSurfaceToGrid();

}

/**
 * Since the requirement is for an initial single message that contains both
 * planet-specific (grid size) and robot-specific (movemement instructions), we
 * need to seperate these concerns explicitly, and publish them to their
 * relevant subscriber interfaces.
 *
 * @param {Object} instructions
 */
Planet.prototype.processInstructions = function(instructions) {
    var instructions = instructions.split('\n');
    console.log(instructions);
};

Planet.prototype.mapSurfaceToGrid = function() {
    //if (this.gridCoordinates.width > 50 || this.gridCoordinates.height > 50) {
    //    throw new Error('This is too big!');
    //}
};