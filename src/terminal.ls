require! {
  'prelude-ls': {is-type, split, each, map, any}
  './robot': Robot
}

module.exports =

  /**
   * Process the instruction string into
   *
   * @param {String} it - the raw instructions
   * @return {Object}
   */
  process-instructions: ->

    if it.length > 100
      throw new Error 'The instructions provided are too long - 100 characters maximum.'

    # Seperate the planet's grid size from the robot instructions.

    [grid-boundary, commands] = it .split /\\n([\s\S]+)?/ 2

    if is-type \Undefined commands
      throw new Error 'There are no commands defined'

    # Process grid boundary

    grid-boundary .= split ' '

    unless grid-boundary.length is 2
      throw new Error 'Grid boundaries must be formatted as two space-delimited coordinates'

    if grid-boundary |> any (> 50)
      throw new Error 'Each grid boundary must be an integer from 1 to 50'

    {
      grid-boundary
      commands: commands |> split \\\n\\n |> map (.split \\\n |> map (.split ' '))
    }

  mobilize-robots: ({grid-boundary, commands}) !->

    commands |> each !->

      robot = new Robot grid-boundary, it
      robot .start-movement-sequence!
