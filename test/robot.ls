require! {
  'chai': {assert}
  'sinon'
  '../src/robot': Robot
}

describe 'Robot', !->

  grid-boundaries = []
  commands = []

  before-each: do !->

    grid-boundaries := ['1' '3']
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

  specify 'move forward' !->

    robot = new Robot grid-boundaries, [['0' '1' 'E'], ['RFRFRFRF']]

    robot .move-forward 'W'
