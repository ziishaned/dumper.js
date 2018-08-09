const kindOf = require('kind-of');
const {red, cyan, blue, black, green, magenta} = require('kleur');

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
        startWith = `${black.bold('object')} (size=${Object.keys(toDump).length}) {\n`;
        endWith = `${indent}}`;
        break;
      default:
        return this.prepareValueDump(indent, toDump);
    }

    // For each key of the object, keep
    // preparing the inspection output
    for (let itemKey in toDump) {
      if (!toDump.hasOwnProperty(itemKey)) {
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
    const paramType = kindOf(originalValue);

    if (paramType === 'array' || paramType === 'object') {
      const displayValue = this.generateDump(originalValue, `${indent}${this.spaces}`);

      return `${displayValue}`;
    }

    if (paramType === 'boolean') {
      const displayValue = originalValue ? magenta('true') : magenta('false');

      return `${cyan(paramType)} ${displayValue}`;
    }

    if (paramType === 'string') {
      const displayValue = `${red(`"${originalValue}"`)} (length=${originalValue.length})`;

      return `${cyan(paramType)} ${displayValue}`;
    }

    if (paramType === 'null') {
      return `${blue(paramType)}`;
    }

    if (paramType === 'number') {
      const displayType = Number.isInteger(originalValue) ? 'int' : 'float';

      return `${cyan(displayType)} ${green(originalValue)}`;
    }

    if (paramType === 'function') {
      return 'function () {}';
    }

    if (paramType === 'regexp') {
      return `${blue(originalValue)}`;
    }

    return originalValue;
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
    if (paramType === 'array') {
      if (typeof key === 'string') {
        return `${indent}${this.spaces}'${key}' => ${valueDump},\n`;
      }

      return `${indent}${this.spaces}[${key}] => ${valueDump},\n`;
    }

    if (Number.isInteger(parseInt(key))) {
      return `${indent}${this.spaces}[${key}] => ${valueDump},\n`;
    }

    return `${indent}${this.spaces}'${key}' => ${valueDump},\n`;
  }
}

module.exports = Dumper;
