{map, split} = require 'prelude-ls'

module.exports =

  'use strict'

  /**
   * Since the requirement is for an initial single message that contains both
   * planet-specific (grid size) and robot-specific (movemement instructions), we
   * need to seperate these concerns explicitly, and publish them to their
   * relevant subscriber interfaces.
   *
   * @param {String} it - the raw instructions
   */
  process-instructions: ->

    if it.length >= 100
      throw new RangeError 'The instructions provided are too long - 100 characters maximum.'

    # Seperate the planet's grid size from the robot instructions.
    [grid-size, commands] = it .split /\n([\s\S]+)?/ 2

    grid-size .= split ' '

    if grid-size[0] > 50 or grid-size[1] > 50
      throw new RangeError 'hello'

    [
      grid-size
      commands |> split \\n\n |> map -> split \\n it
    ]

  mobilize-robots: (grid-boundaries, commands) !->

    command <-! commands .split \\n\n .for-each
    new Robot gridBoundaries, command
