{is-type, split, each, map} = require 'prelude-ls'

require! <[ ./robot ]>

module.exports =

  /**
   * Process the instruction string into
   *
   * @param {String} it - the raw instructions
   * @return {Array}
   */
  process-instructions: ->

    if it.length >= 100
      throw new Error 'The instructions provided are too long - 100 characters maximum.'

    # Seperate the planet's grid size from the robot instructions.
    [grid-size, commands] = it .split /\n([\s\S]+)?/ 2

    #console.log it

    if is-type 'Undefined' commands
      throw new Error 'There are no commands defined'

    grid-size .= split ' '

    if grid-size[0] > 50 or grid-size[1] > 50
       throw new RangeError 'This grid size is too large. It must be 50x50 or smaller'

    [
      grid-size
      commands |> split \\n\n |> map (.split \\n)
    ]

  mobilize-robots: ([grid-size, commands] = instructions) !->

    console.log commands

    #console.log commands

    #commands |> each !->
    #  console.log 'hello!'
    #new Robot gridBoundaries, command
