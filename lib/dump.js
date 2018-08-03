const chalk = require('chalk').default;

class Dump {
    constructor() {
        this.spaces = ' '.repeat(4);
    }

    /**
     * Iterate over each property of the provided object and make the output.
     *
     * @param {*} obj
     * @param {string|null} tab
     * @return {string}
     */
    start(obj, tab = '') {
        let dump = '';

        const isArray = this.getType(obj) === 'array';
        if (isArray) {
            dump = `${chalk.bold.black('array')} (size=${obj.length}) [\n`;
        } else {
            dump = `${chalk.bold.black('object')} (size=${Object.keys(obj).length}) {\n`;
        }

        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                let val = '';
                const param = obj[i];

                const paramType = this.getType(param);
                switch (paramType) {
                    case 'array':
                    case 'object':
                        val = this.start(param, `${tab}${this.spaces}`);
                        break;
                    case 'boolean':
                        val = param ? `boolean ${chalk.cyan('true')}` : `boolean ${chalk.cyan(false)}`;
                        break;
                    case 'string':
                        val = `string ${chalk.red(`"${param}"`)} (length=${param.length})`;
                        break;
                    case 'null':
                        val = `${chalk.blue('null')}`;
                        break;
                    case 'number':
                        val = Number.isInteger(param) ? `int ${chalk.green(param)}` : `float ${chalk.yellow(param)}`;
                        break;
                    case 'function':
                        val = 'function () {}';
                        break;
                    case 'regexp':
                        val = `${chalk.blue(param)}`;
                        break;
                    default:
                        val = param;
                        break;
                }

                dump += (() => {
                    if (paramType === 'array') {
                        if (typeof i === 'string') {
                            return `${tab}${this.spaces}'${i}' => ${val},\n`;
                        }
                        return `${tab}${this.spaces}[${i}] => ${val},\n`;
                    } else {
                        if (Number.isInteger(parseInt(i))) {
                            return `${tab}${this.spaces}[${i}] => ${val},\n`;
                        }
                        return `${tab}${this.spaces}'${i}' => ${val},\n`;
                    }
                })();
            }
        }

        dump = `${dump.substring(0, dump.length - 2)}\n${tab}`;

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
        } else if (this.isNumber(obj)) {
            return 'number';
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
        return typeof obj === 'function' ? this.objectToString(obj).match(/Function/) !== null : false;
    }

    /**
     * Check if variable type is string.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isString(obj) {
        return typeof obj === 'string' ? true : typeof obj === 'object' ? this.objectToString(obj).match(/string/i) !== null : false;
    }

    /**
     * Check if variable type is array.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isArray(obj) {
        return typeof obj === 'object' ? this.objectToString(obj).match(/array/i) !== null || obj.length !== undefined : false;
    }

    /**
     * Check if variable type is boolean.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isBoolean(obj) {
        return typeof obj === 'boolean' ? true : typeof obj === 'object' ? this.objectToString(obj).match(/boolean/i) !== null : false;
    }

    /**
     * Check if variable type is date.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isDate(obj) {
        return typeof obj === 'object' ? this.objectToString(obj).match(/date/i) !== null : false;
    }

    /**
     * Check if variable type is html.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isHTML(obj) {
        return typeof obj === 'object' ? this.objectToString(obj).match(/html/i) !== null : false;
    }

    /**
     * Check if variable type is object.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isObject(obj) {
        return typeof obj === 'object' ? this.objectToString(obj).match(/object/i) !== null : false;
    }

    /**
     * Check if variable type is regular expression.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isRegExp(obj) {
        return typeof obj === 'object' ? this.objectToString(obj).match(/regexp/i) !== null : false;
    }

    /**
     * Check if variable type is number.
     *
     * @param {*} obj
     * @return {boolean}
     */
    isNumber(obj) {
        return typeof obj === 'number' ? true : typeof obj === 'object' ? this.objectToString(obj).match(/Number/) !== null : false;
    }

    /**
     * Get the constructor name from passed object.
     *
     * @param {*} obj
     * @return {string}
     */
    objectToString(obj) {
        return obj.constructor.toString();
    }
}

module.exports = Dump;
