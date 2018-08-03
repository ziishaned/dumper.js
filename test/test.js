/* eslint-disable no-console */
const assert = require('chai').assert;

const Dump = require('../lib/dump');

describe('Dump class tests', () => {
    let users = [];
    let dump = new Dump();

    beforeEach(() => {
        dump = new Dump();
        users = [
            { user: 'barney', age: 36, active: true, createdAt: new Date(), getAge: () => this.age },
            { user: 'fred', age: 40, active: false, createdAt: new Date(), getAge: () => this.age },
            { user: 'pebbles', age: 1, active: true, createdAt: new Date(), getAge: () => this.age }
        ];

    });

    it('should dump the provided object', () => {
        let dumpOutput = dump.start(users);
        assert.typeOf(dumpOutput, 'string');
    });

    it('should return true if argument type is undefined', () => {
        let expected = dump.isUndefined(users[0].username);
        assert.equal(expected, true);
    });

    it('should return false if argument type is not undefined', () => {
        let expected = dump.isUndefined(users[0].user);
        assert.equal(expected, false);
    });

    it('should return true if argument type is number', () => {
        let expected = dump.isNumber(users[0].age);
        assert.equal(expected, true);
    });

    it('should return false if argument type is not number', () => {
        let expected = dump.isNumber(users[0].user);
        assert.equal(expected, false);
    });

    it('should return type of the provided argument', () => {
        let expected = dump.getType(users[0].user);
        assert.equal(expected, 'string');
    });

    it('should return true if argument type is array', () => {
        let expected = dump.isArray(users);
        assert.equal(expected, true);
    });

    it('should return false if argument type is not array', () => {
        let expected = dump.isArray(users[0]);
        assert.equal(expected, false);
    });

    it('should return true if argument type is boolean', () => {
        let expected = dump.isBoolean(users[0].active);
        assert.equal(expected, true);
    });

    it('should return false if argument type is not boolean', () => {
        let expected = dump.isBoolean(users[0].age);
        assert.equal(expected, false);
    });

    it('should return true if argument type is date', () => {
        let expected = dump.isDate(users[0].createdAt);
        assert.equal(expected, true);
    });

    it('should return false if argument type is not date', () => {
        let expected = dump.isDate(users[0].age);
        assert.equal(expected, false);
    });

    it('should return true if argument type is function', () => {
        let expected = dump.isFunction(users[0].getAge);
        assert.equal(expected, true);
    });

    it('should return false if argument type is not function', () => {
        let expected = dump.isFunction(users[0]);
        assert.equal(expected, false);
    });

    it('should return true if argument type is null', () => {
        let expected = dump.isNull(null);
        assert.equal(expected, true);
    });

    it('should return false if argument type is not null', () => {
        let expected = dump.isNull(users[0]);
        assert.equal(expected, false);
    });

    it('should return true if argument type is object', () => {
        let expected = dump.isObject(users[0]);
        assert.equal(expected, true);
    });

    it('should return false if argument type is not object', () => {
        let expected = dump.isObject(users[0].age);
        assert.equal(expected, false);
    });

    it('should return true if argument type is regexp', () => {
        let expected = dump.isRegExp(/[0-9]+/);
        assert.equal(expected, true);
    });

    it('should return false if argument type is not regexp', () => {
        let expected = dump.isRegExp(users[0].age);
        assert.equal(expected, false);
    });

    it('should return true if argument type is string', () => {
        let expected = dump.isString(users[0].user);
        assert.equal(expected, true);
    });

    it('should return false if argument type is not string', () => {
        let expected = dump.isString(users[0].age);
        assert.equal(expected, false);
    });
});
