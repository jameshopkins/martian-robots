require! {
  'chai'
  'sinon'
  '../src/terminal'
}

Planet = require '../src/planet'
assert = chai.assert

describe 'Terminal' !->

  var valid-planet
  var valid-instructions

  beforeEach !->
    valid-planet := new Planet!
    valid-instructions := '5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL'

  specify 'should only attempt a connection to a valid planet' !->

    assert.does-not-throw do
      terminal .create-connection .bind terminal, valid-planet, valid-instructions

    # Invalid planet
    fake-planet = !->
    assert.throw do
      terminal .create-connection .bind terminal, new fake-planet!, valid-instructions
      Error
      'The planet you want to connect to isn\'t real - we suggest you study the solar system better!'

  specify 'call the method that sets the grid size' !->

    sinon .spy valid-planet, \setGridSize
    terminal .create-connection valid-planet, valid-instructions
    assert (valid-planet .set-grid-size .called-once)


  describe 'Instructions', !->

    specify 'throws an error if the string is 100 characters or more' !->

      instructions = Array 101 .join \a

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
