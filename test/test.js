'use strict'

const assert = require('chai').assert
const dd = require('../lib/dd')
const inspect = require('../lib/inspect')

describe('inspect()', () => {

    it('is a function', () => {
        assert.isFunction(inspect)
    })

    it('returns a formatted inspection', () => {
        let inspection = inspect({ foo: 'foo' })
        assert.isString(inspection)
        assert.include(inspection, 'foo')
    })
})

describe('dd()', () => {
    it('is a function', () => {
        assert.isFunction(dd)
    })
})
