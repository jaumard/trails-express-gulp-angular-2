'use strict'
/* global describe, it */

const assert = require('assert')

describe('Hero Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Hero'])
  })
})
