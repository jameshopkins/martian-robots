require! {
  'chai': {assert}
  'sinon'
  '../src/robot': Robot
}

describe 'Robot', !->

  grid-boundaries = []
  commands = []

  before-each: do !->

    grid-boundaries := ['5' '3']
    commands := [['1' '1' 'E'], ['RFRFRFRF']]

  specify 'throws an error if the robot position isn\'t an array comprising of three items' !->

    commands = [['1' '1'], ['RFRFRFRF']]

    assert .throws do
      !-> new Robot grid-boundaries, commands
      Error
      'The robot position must comprise of two cartesian coordinates followed by a cardinal direction'

  specify 'returns associated data based on a cardinal direction' !->

    robot = new Robot grid-boundaries, commands

    assert .equal robot.get-cardinal-direction-data('N'), 0
    assert .equal robot.get-cardinal-direction-data('E'), 1
    assert .equal robot.get-cardinal-direction-data('S'), 2
    assert .equal robot.get-cardinal-direction-data('W'), 3

  specify 'circular buffer' !->

    robot = new Robot grid-boundaries, commands

    assert .equal robot.create-circular-buffer-of-cardinal-points('S', 'L'), 1
    assert .equal robot.create-circular-buffer-of-cardinal-points('S', 'R'), 3
    assert .equal robot.create-circular-buffer-of-cardinal-points('W', 'L'), 2

  describe 'Move forward', !->

    specify 'move forward correctly' !->

      robot = new Robot ['2' '2'], [['1' '1' 'E'], ['RFRFRFRF']]

      robot .move-forward 'N'
      assert .equal robot.current-position.y, 2

      robot .move-forward 'S'
      assert .equal robot.current-position.y, 1

      robot .move-forward 'E'
      assert .equal robot.current-position.x, 2

      robot .move-forward 'W'
      assert .equal robot.current-position.x, 1

    specify 'registers as lost if it strays' !->

      robot = new Robot ['1' '1'], [['1' '1' 'E'], ['RFRFRFRF']]

      robot .move-forward 'N'
      assert .is-true robot.is-lost

  describe 'Any subsequent', !->

    specify 'hello' !->

      robot1 = new Robot ['1' '1'], [['1' '1' 'E'], ['RFRFRFRF']]
      robot1 .move-forward 'N'

      robot2 = new Robot ['1' '1'], [['1' '1' 'E'], ['RFRFRFRF']]
      robot2 .move-forward 'N'
      assert .is-false robot2.is-lost
