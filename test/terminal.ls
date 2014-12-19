require! <[ chai sinon ../src/terminal ]>

{assert} = chai

describe 'Instructions', !->

  specify 'throws an error if the string is 100 characters or more' !->

    assert.throw do
      terminal .process-instructions .bind terminal, \a * 101
      Error
      'The instructions provided are too long - 100 characters maximum.'

  specify 'throws an error if no commands can be destructured from the input string' !->

    assert.throw do
      terminal .process-instructions .bind terminal, \a * 99
      Error
      'There are no commands defined'

  describe 'Boundaries', !->

    specify 'throws an error if grid boundaries are not formatted as two space-delimted coordinates' !->

      assert.throw do
        terminal .process-instructions .bind terminal, '53\\n1 1 E\\nRFRFRFRF'
        Error
        'Grid boundaries must be formatted as two space-delimited coordinates'

    specify 'throws an error if either grid boundary if it\'s value is greater than 50' !->

      assert.throws do
        terminal .process-instructions .bind terminal, '5 51\\n1 1 E\\nRFRFRFRF'
        Error
        'Each grid boundary must be an integer from 1 to 50'

  specify 'returns a valid data structure' !->

    result = terminal .process-instructions '5 3\\n1 1 E\\nRFRFRFRF\\n\\n0 3 W'

    # An array of upper-right grid coordinates
    assert .deep-equal result.grid-boundary, ['5', '3']

    # A string consisting of a coordinate, followed by the initial coordinates
    assert .deep-equal result.commands[0][0], ['1' '1' 'E']

    # A string as the robot instruction
    assert .equal result.commands[0][1], 'RFRFRFRF'

    assert .deep-equal result.commands[1][0], ['0' '3' 'W']
