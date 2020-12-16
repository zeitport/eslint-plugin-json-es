const Linter = require('eslint').Linter;
const {parseForESLint} = require('../index');
const rules = require('../rules');

const linter = new Linter();

linter.defineParser('eslint-plugin-json-es', {
    parseForESLint
});

const scopedRules = {};

Object.keys(rules).forEach(ruleId => {
    scopedRules[`json-es/${ruleId}`] = rules[ruleId];
});

linter.defineRules(scopedRules);

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
    verifyAndFix
}
