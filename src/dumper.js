const kindOf = require('kind-of');
const {decycle} = require('cycle');
const {yellow, cyan, black, green, magenta} = require('kleur');

/**
 * Generate structured information about one or more objects that
 * includes each item type and value.
 *
 * @author Zeeshan Ahmad <ziishaned@gmail.com>
 */
class Dumper {
  /**
   * @param {int} indentCount Number of spaces to indent the object with
   */
  constructor(indentCount = 4) {
    this.spaces = ' '.repeat(indentCount);
  }

  /**
   * Iterates over each property of the provided object and make the output.
   *
   * @param {*} toDump
   * @param {string|null} indent
   * @return {string}
   */
  generateDump(toDump, indent = '') {
    let dump = '';

    let startWith = '';
    let endWith = '';

    switch (kindOf(toDump)) {
      case 'array':
        startWith = `${black.bold('array')} (size=${toDump.length}) [\n`;
        endWith = `${indent}]`;
        break;
      case 'object':
        toDump = decycle(toDump);
        startWith = `${black.bold('object')} (size=${Object.keys(toDump).length}) {\n`;
        endWith = `${indent}}`;
        break;
      default:
        return this.prepareValueDump(indent, toDump);
    }

    // For each key of the object, keep
    // preparing the inspection output
    for (let itemKey in toDump) {
      if (!Object.prototype.hasOwnProperty.call(toDump, itemKey)) {
        continue;
      }

      const originalValue = toDump[itemKey];
      const originalParamType = kindOf(toDump);
      const valueDump = this.prepareValueDump(indent, originalValue);

      dump += this.makeArrowString(originalParamType, indent, itemKey, valueDump);
    }

    return startWith + dump + endWith;
  }

  formatFunction(originalValue) {
    return originalValue
      .toString()
      .slice(0, 50)
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ');
  }

  /**
   * Prepare the dump output for the given value
   *
   * @param indent
   * @param originalValue
   * @return {*|string}
   */
  prepareValueDump(indent, originalValue) {
    const paramType = kindOf(originalValue);

    let displayType = paramType;
    let displayValue;

    switch (paramType) {
      case 'array':
      case 'object':
        displayType = '';
        displayValue = this.generateDump(originalValue, `${indent}${this.spaces}`);
        break;
      case 'boolean':
        displayValue = magenta(`${originalValue}`);
        break;
      case 'string':
        displayValue = `${yellow(`${originalValue}`)} (length=${originalValue.length})`;
        break;
      case 'null':
        displayValue = '';
        break;
      case 'undefined':
        displayValue = '';
        break;
      case 'number':
        displayType = Number.isInteger(originalValue) ? 'int' : 'float';
        displayValue = cyan(originalValue);
        break;
      case 'function':
      case 'generatorfunction':
        displayValue = this.formatFunction(originalValue);
        break;
      default:
        displayValue = originalValue.toString();
        break;
    }
    let spacer = displayType.length > 0 && displayValue.length > 0 ? ' ' : '';

    return `${black.bold(displayType)}${spacer}${displayValue}`;
  }

  /**
   * Make the arrow string.
   *
   * @param {string} paramType
   * @param {string} indent
   * @param {string|number} key
   * @param {*} valueDump
   * @return {string}
   */
  makeArrowString(paramType, indent, key, valueDump) {
    let bracketedKey = paramType === 'array' && Number.isInteger(parseInt(key)) ? `[${key}]` : key;

    return `${indent}${this.spaces}${green(bracketedKey)} => ${valueDump},\n`;
  }
}

module.exports = Dumper;
