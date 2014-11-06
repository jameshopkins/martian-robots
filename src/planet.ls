/**
 * Provides us with an interface to set up a suitable enviroment,
 * so that robots that move around on it's surface.
 *
 * @constructor
 */

!function Planet then

  'use strict'

  # We never want to control the movements of robots on multiple planets
  # concurrently.
  if Planet .instance
    return Planet .instance
  Planet.instance = @

Planet::setGridSize = (coordinates) !->

  @grid-coordinates = coordinates .split ' '

  if @grid-coordinates[0] > 50 or @grid-coordinates[1] > 50
    throw new Error 'This grid size is too large. It must be 50x50 or smaller'

module.exports = Planet
