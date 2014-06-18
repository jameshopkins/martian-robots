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
function Planet() {

    // We never want to control the movements of robots on multiple planets
    // concurrently.
    if (Planet.instance)
        return Planet.instance;
    Planet.instance = this;

    /*this.gridCoordinates = {
        width: gridCoordinates[0],
        height: gridCoordinates[1]
    };*/
    //this.processInstructions(instructions);
    //this.mapSurfaceToGrid();

}

Planet.prototype.mapSurfaceToGrid = function() {
    alert('This works!');
    //if (this.gridCoordinates.width > 50 || this.gridCoordinates.height > 50) {
    //    throw new Error('This is too big!');
    //}
};

Planet.prototype.setGridSize = function(coordinates) {
    this.coordinates = coordinates.split(' ');
};

