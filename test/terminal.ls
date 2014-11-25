require! <[ chai sinon ../src/terminal ]>

{assert} = chai

describe 'Instructions input', !->

  specify 'throws an error if the string is 100 characters or more' !->

    assert.throw do
      terminal .process-instructions .bind terminal, \a * 100
      Error
      'The instructions provided are too long - 100 characters maximum.'

  specify 'throws an error if no commands can be destructured from the input string' !->

    # Split on the first occurence of a newline, and treat the first item as the
    # commands
    assert.throw do
      terminal .process-instructions .bind terminal, \a * 99
      Error
      'There are no commands defined'

  specify 'throws an error if either of the upper right coordinates are larger than 50' !->

    assert.throw do
      terminal .process-instructions .bind terminal, '51 0\nA'
      Error
      'This grid size is too large. It must be 50x50 or smaller'

    assert.throw do
      terminal .process-instructions .bind terminal, '0 51\nA'
      Error
      'This grid size is too large. It must be 50x50 or smaller'
