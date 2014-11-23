require! <[ chai sinon ../src/terminal ]>

Planet = require '../src/planet'
assert = chai.assert

describe 'Terminal' !->

  var valid-instructions

  beforeEach !->
    valid-instructions := '5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL'

    console.log(terminal .process-instructions valid-instructions)

  specify 'call the method that sets the grid size' !->

    sinon .spy valid-planet, \setGridSize
    terminal .create-connection valid-planet, valid-instructions
    assert (valid-planet .set-grid-size .called-once)

  specify 'call the method that mobilizes the robots' !->

    sinon .spy valid-planet, \setGridSize
    terminal .create-connection valid-planet, valid-instructions
    assert (valid-planet .set-grid-size .called-once)

  specify 'return the commands'

  describe 'Instructions', !->

    specify 'throws an error if the string is 100 characters or more' !->

      instructions = \a * 101

      assert.throw do
        terminal .create-connection .bind terminal, valid-planet, instructions
        Error
        'The instructions provided are too long - 100 characters maximum.'

    specify 'throws an error if the upper-right coordinates are of an illegal format' !->

      error-message = 'The upper-right grid coordinates are an illegal format'

      # No delimeting space between signs
      assert.throw do
        terminal .create-connection .bind terminal, valid-planet, '22'
        Error
        error-message

      # Non-numerical signs
      assert.throw do
        terminal .create-connection .bind terminal, valid-planet, 'A B'
        Error
        error-message

      # Invalid sign length
      assert.throw do
        terminal .create-connection .bind terminal, valid-planet, '2 22'
        Error
        error-message
