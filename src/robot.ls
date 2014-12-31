require! {
  'prelude-ls': {each, zip, map, elem-index, is-type, head, chars}
  './lost-robots'
}

/**
 * Creates a robot as well as handling all of it's movement.
 *
 * @constructor
 * @param {Array} grid-boundaries - The permitted grid boundaries in which the
 *                 robot is allowed to move around in.
 * @param {Array} command - The instructions detailing the movement sequence.
 */
!function Robot (grid-boundaries, command) then

  [@position, @sequence] = command

  unless @position.length is 3
    throw new Error 'The robot position must comprise of two cartesian coordinates followed by a cardinal direction'

  # Validate the format of the position fragments - grid coordinate and
  # orientation.
  @position |> zip [/^[0-9]/ /^[0-9]/ /[NESW]/i] |> each !->
    unless it.0 .test it.1
      throw new Error "The position fragment given ('#{it[1]}') is invalid"

  @is-lost = false

  # Store the associations between cardinal directions and cartesian grid
  # lines.
  @cardinal-directions-grid =
    * \N \y \positive
    * \E \x \positive
    * \S \y \negative
    * \W \x \negative

  @grid-boundaries =
    x: grid-boundaries.0
    y: grid-boundaries.1

  @current-position =
    x: parse-int @position.0
    y: parse-int @position.1
    get-coordinates: -> "#{@x}, #{@y}"

Robot:: =

  /**
   * Processes an instruction to move forward.
   *
   * @param {String} cardinal-point
   */
  move-forward: !->

    # Because you can't store an operator in a variable.
    signs =
      positive: ~> @current-position[it] + 1
      negative: ~> @current-position[it] - 1

    required-axis = @cardinal-directions-grid[@get-cardinal-direction-data it]
    new-coordinate = signs[required-axis.2] required-axis.1

    # 1) Register the robot as lost if it strays beyond the upper-right
    #    coordinates of the reactangular world.
    # 2) Since the lower-left coordinates are assumed to be 0, 0, register the
    #    robot as lost if it strays into the negative line of either axis on
    #    the Cartesian grid.
    if new-coordinate > @grid-boundaries[required-axis.1] or new-coordinate < 0

      # If a previous robot has dropped off the world from the same point
      # the current robot has been instructed to move from, then ignore the
      # current command.
      return unless is-type 'Undefined' (lost-robots |> elem-index @current-position.get-coordinates!)

      # A robot only becomes lost if it drops off the world from a position
      # where a previous robot hasn't been lost from.
      @is-lost = true
      console.log 'Robot is lost!'
      lost-robots .push @current-position.get-coordinates!

    else

      # Only move the robot if that movement results in the robot being
      # positioned within the grid boundaries.
      @current-position[required-axis.1] = new-coordinate
      console.log "Robot has moved forward to #{@current-position.get-coordinates!}"

  /**
   * Retrieve data associating cardinal direction and cartesian grid lines.
   *
   * @param {String} cardinal-point
   * @return {String|Array} The position of the cardinal point within our
   *         circular buffer.
   */
  get-cardinal-direction-data: ->

    @cardinal-directions-grid |> map (.0) |> elem-index it

  /**
   * An implementation of a circular buffer to allow us to move between cardinal
   * points with ease.
   *
   * @param {String} cardinal point
   * @param {String} direction - either 'L' or 'R'
   */
  create-circular-buffer-of-cardinal-points: (cardinal-point, direction) ->

    point-index = @get-cardinal-direction-data cardinal-point

    switch direction
    | \L => point-index = --point-index
    | \R => point-index = ++point-index

    if point-index >= @cardinal-directions-grid .length
      point-index = 0
    if point-index is -1
      point-index = @cardinal-directions-grid .length - 1

    @cardinal-directions-grid[point-index][0]

  start-movement-sequence: !->

    cardinal-point = @position.2

    console.log "\nRobot activated at #{@current-position.get-coordinates!} (facing #cardinal-point)"

    for movement in @sequence |> head |> chars

      # Stop processing the sequence if the robot becomes lost.
      return if @is-lost

      switch movement
      | \L \R =>
        movement-types = L: 'left' R: 'right'
        cardinal-point := @create-circular-buffer-of-cardinal-points cardinal-point, movement
        console.log "Robot has turned #{movement-types[movement]} (now facing #cardinal-point)"
      | \F => @move-forward cardinal-point

module.exports = Robot
