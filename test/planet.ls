require! {
  'chai'
  'sinon'
}

Planet = require '../src/planet'
assert = chai.assert

describe 'Planet' !->

  var planet

  beforeEach !->
    planet := new Planet!

  specify 'throws an error if the grid size is too large' !->

    assert.throw do
      planet .set-grid-size .bind planet, '10000 51'
      Error
      'This grid size is too large. It must be 50x50 or smaller'
