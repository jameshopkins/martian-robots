Planet = require './planet'

module.exports = do ->

  'use strict'

  /**
   * Since the requirement is for an initial single message that contains both
   * planet-specific (grid size) and robot-specific (movemement instructions), we
   * need to seperate these concerns explicitly, and publish them to their
   * relevant subscriber interfaces.
   *
   * @param {Object} planet
   * @param {String} instructions
   */
  !function process-instructions (planet, instructions) then

    if instructions.length >= 100
      throw new Error 'The instructions provided are too long - 100 characters maximum.'

    # Seperate the planet's grid size from the robot instructions.
    instructions .= split /\n([\s\S]+)?/ 2

    # Check valditiy of upper-right grid coordinates.
    unless /^\d \d\b/ .test instructions[0]
      throw new Error 'The upper-right grid coordinates are an illegal format.'

    # Set the planet's grid size.
    planet .set-grid-size instructions[0]

    # Start the robots!
    #mobilizeRobots instructions[0], instructions[1]

  {

    create-connection: (planet, instructions) !->

      unless planet instanceof Planet
        throw new Error 'The planet you want to connect to isn\'t real - we suggest you study the solar system better!'

      process-instructions planet, instructions

  }
