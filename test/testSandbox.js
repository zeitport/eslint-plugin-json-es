const test = require('ava');
const Linter = require('eslint').Linter;
const {parseJson} = require('../src/parseJson');

const linter = new Linter();

linter.defineParser('@zeitport/eslint-json-parser', {
    parseForESLint: parseJson
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
