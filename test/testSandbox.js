const test = require('ava');
const Linter = require('eslint').Linter;
const {parseForESLint} = require('../index');

const linter = new Linter();

linter.defineParser('@zeitport/eslint-plugin-json', {
    parseForESLint
});

/**
 * @param {string} code
 * @param {Object} config
 * @returns {string}
 */
function verifyAndFix(code, config) {
    const result = linter.verifyAndFix(code, config, {filename: 'test.json'});

    return result.output;
}

module.exports = {
    linter,
    test,
    verifyAndFix
}
