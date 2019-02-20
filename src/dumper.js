const kindOf = require('kind-of');
const {decycle} = require('cycle');
const {red, cyan, blue, green, magenta, bold} = require('kleur');

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
        startWith = `${bold().black('array')} (size=${toDump.length}) [\n`;
        endWith = `${indent}]`;
        break;
      case 'object':
        toDump = decycle(toDump);
        startWith = `${bold().black('object')} (size=${Object.keys(toDump).length}) {\n`;
        endWith = `${indent}}`;
        break;
      default:
        return this.prepareValueDump(indent, toDump);
    }

    // For each key of the object, keep
    // preparing the inspection output
    for (const itemKey in toDump) {
      if (!Object.prototype.hasOwnProperty.call(toDump, itemKey)) {
        continue;
      }

      const originalValue = toDump[itemKey];
      const originalParamType = kindOf(originalValue);
      const valueDump = this.prepareValueDump(indent, originalValue);

      dump += this.makeArrowString(originalParamType, indent, itemKey, valueDump);
    }

    return startWith + dump + endWith;
  }

  /**
   * Prepare the dump output for the given value
   *
   * @param indent
   * @param originalValue
   * @return {*|string}
   */
  prepareValueDump(indent, originalValue) {
    let displayValue = '';
    let displayType = kindOf(originalValue);

    switch (displayType) {
      case 'array':
      case 'object':
        displayType = '';
        displayValue = this.generateDump(originalValue, `${indent}${this.spaces}`);
        break;
      case 'boolean':
        displayType = 'boolean';
        displayValue = magenta(`${originalValue}`);
        break;
      case 'string':
        displayType = 'string';
        displayValue = `${red(`"${originalValue}"`)} (length=${originalValue.length})`;
        break;
      case 'null':
        displayType = '';
        displayValue = blue('null');
        break;
      case 'undefined':
        displayType = '';
        displayValue = blue('undefined');
        break;
      case 'number':
        displayType = Number.isInteger(originalValue) ? 'int' : 'float';
        displayValue = green(originalValue);
        break;
      case 'function':
      case 'generatorfunction':
        displayType = '';
        displayValue = this.formatFunction(originalValue);
        break;
      case 'regexp':
        displayType = '';
        displayValue = blue(originalValue);
        break;
      default:
        displayType = '';
        displayValue = originalValue;
        break;
    }

    let spacer = displayType.length ? ' ' : '';

    return `${cyan(displayType)}${spacer}${displayValue}`;
  }

  /**
   * Format function to log it inside the console.
   *
   * @param {*} originalValue
   * @return {string}
   */
  formatFunction(originalValue) {
    return originalValue
      .toString()
      .slice(0, 50)
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ');
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
    const startWith = `${indent}${this.spaces}`;
    const valuePart = `${valueDump},\n`;

    let keyPart;
    if (Number.isInteger(parseInt(key)) || (paramType === 'array' && typeof key !== 'string')) {
      keyPart = `[${key}]`;
    } else {
      keyPart = `'${key}'`;
    }

    return `${startWith + keyPart} => ${valuePart}`;
  }
}

module.exports = Dumper;
