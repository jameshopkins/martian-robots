/**
 * Provides us with an interface to set up a suitable enviroment,
 * so that robots that move around on it's surface.
 * 
 * @constructor
 */
function Planet() {

    'use strict';

    // We never want to control the movements of robots on multiple planets
    // concurrently.
    if (Planet.instance)
        return Planet.instance;
    Planet.instance = this;

}

Planet.prototype.setGridSize = function(coordinates) {
    this.gridCoordinates = coordinates.split(' ');
    if (this.gridCoordinates[0] > 50 || this.gridCoordinates[1] > 50) {
        throw new Error('This grid size is too large. It must be 50x50 or smaller');
    }
};

