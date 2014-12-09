require! <[ chai sinon ../src/terminal ]>

{assert} = chai

describe 'Instructions', !->

  specify 'throws an error if the string is 100 characters or more' !->

    assert.throw do
      terminal .process-instructions .bind terminal, \a * 100
      Error
      'The instructions provided are too long - 100 characters maximum.'

  specify 'throws an error if no commands can be destructured from the input string' !->

    assert.throw do
      terminal .process-instructions .bind terminal, \a * 99
      Error
      'There are no commands defined'

  specify 'throws an error if either of the upper right coordinates are larger than 50' !->

    assert.throw do
      terminal .process-instructions .bind terminal, '51 0\\nA'
      Error
      'This grid size is too large. It must be 50x50 or smaller'

    assert.throw do
      terminal .process-instructions .bind terminal, '0 51\\nA'
      Error
      'This grid size is too large. It must be 50x50 or smaller'

  specify 'returns a valid data structure' !->

    result = terminal .process-instructions '5 3\\n1 1 E\\nRFRFRFRF\\n\\n0 3 W'

    # An array of upper-right grid coordinates
    assert .deep-equal result.grid-size, ['5', '3']

    # A string consisting of a coordinate, followed by the initial coordinates
    assert .deep-equal result.commands[0][0], ['1' '1' 'E']

    # A string as the robot instruction
    assert .equal result.commands[0][1], 'RFRFRFRF'

    assert .deep-equal result.commands[1][0], ['0' '3' 'W']

  specify 'the correct number of robots are run' !->


#describe 'Robots', !->

#  specify 'create a robot instance for each set of instructions' !->
