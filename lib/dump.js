class Dump {
    /**
     * @param {*} obj
     */
    constructor(obj) {
        this.start(obj);
    }

    /**
     * @param {*} obj
     * @param {sting} t
     * @return {string}
     */
    start(obj, t = null) {
        const tab = t || '';
        const isArray = this.getType(obj) === 'array';
        let dump = isArray ? `array(${obj.length}) [\n` : `object(${Object.keys(obj).length}) {\n`;

        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                let val = '';
                const param = obj[i];

                const paramType = this.getType(param);
                switch (paramType) {
                    case 'array':
                    case 'object':
                        val = this.start(param, `${tab}\t`);
                        break;
                    case 'boolean':
                        val = param ? 'bool(true)' : 'bool(false)';
                        break;
                    case 'string':
                        val = `string(${param.length}) "${param}"`;
                        break;
                    case 'null':
                        val = 'NULL';
                        break;
                    case 'number':
                        val = Number.isInteger(param) ? `int(${param})` : `float(${param})`;
                        break;
                    case 'function':
                        val = 'function () {}';
                        break;
                    default:
                        val = param;
                }

                dump += (function () {
                    if (paramType === 'array') {
                        if (typeof i === 'string') {
                            return `${tab}\t'${i}' => ${val},\n`;
                        }
                        return `${tab}\t[${i}] => ${val},\n`;
                    } else {
                        if (Number.isInteger(parseInt(i))) {
                            return `${tab}\t[${i}] => ${val},\n`;
                        }
                        return `${tab}\t'${i}' => ${val},\n`;
                    }
                })();
            }
        }

        dump = dump.substring(0, dump.length - 2) + '\n' + tab;

        return isArray ? `${dump}]` : `${dump}}`;
    }

    /**
     * Get the type of the passed variable.
     *
     * @param {*} obj
     * @return {string}
     */
    getType(obj) {
        if (this.isNull(obj)) {
            return 'null';
        } else if (this.isUndefined(obj)) {
            return 'undefined';
        } else if (this.isFunction(obj)) {
            return 'function';
        } else if (this.isString(obj)) {
            return 'string';
        } else if (this.isArray(obj)) {
            return 'array';
        } else if (this.isBoolean(obj)) {
            return 'boolean';
        } else if (this.isDate(obj)) {
            return 'date';
        } else if (this.isHTML(obj)) {
            return 'html';
        } else if (this.isObject(obj)) {
            return 'object';
        } else if (this.isRegExp(obj)) {
            return 'regexp';
        }
    }

    /**
     * Check if variable type is null.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isNull(obj) {
        return obj === null;
    }

    /**
     * Check if variable type is undefined.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isUndefined(obj) {
        return obj === undefined;
    }

    /**
     * Check if variable type is function.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isFunction(obj) {
        return typeof obj === 'function' ? obj.constructor.toString().match(/Function/) !== null : false;
    }

    /**
     * Check if variable type is string.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isString(obj) {
        return typeof obj === 'string' ? true : typeof obj === 'object' ? obj.constructor.toString().match(/string/i) !== null : false;
    }

    /**
     * Check if variable type is array.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isArray(obj) {
        return typeof obj === 'object' ? obj.constructor.toString().match(/array/i) !== null || obj.length !== undefined : false;
    }

    /**
     * Check if variable type is boolean.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isBoolean(obj) {
        return typeof obj === 'boolean' ? true : typeof obj === 'object' ? obj.constructor.toString().match(/boolean/i) !== null : false;
    }

    /**
     * Check if variable type is date.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isDate(obj) {
        return typeof obj === 'date' ? true : typeof obj === 'object' ? obj.constructor.toString().match(/date/i) !== null : false;
    }

    /**
     * Check if variable type is html.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isHTML(obj) {
        return typeof obj === 'object' ? obj.constructor.toString().match(/html/i) !== null : false;
    }

    /**
     * Check if variable type is object.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isObject(obj) {
        return typeof obj === 'object' ? obj.constructor.toString().match(/object/i) !== null : false;
    }

    /**
     * Check if variable type is regular expression.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isRegExp(obj) {
        return typeof obj === 'function' ? obj.constructor.toString().match(/regexp/i) !== null : false;
    }
}

module.exports = Dump;
