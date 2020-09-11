const test = require('ava');
const Linter = require('eslint').Linter;
const {parseJson} = require('../../src/parseJson');

const config = {
    parser: '@zeitport/eslint-json-parser',
    rules: {
        quotes: ['error', 'double']
    }
};

test('quotes rule verify', expect => {
    // Given
    const code = `{\n    'planets': [{"name": "mars"}]\n}`;
    const linter = createLinter();

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        ruleId: 'quotes',
        severity: 2,
        line: 2,
        endLine: 2,
        column: 5,
        endColumn: 14,
        fix: {
            range: [6, 15],
            text: '"planets"'
        },
        nodeType: 'Literal'
    };
    expect.like(messages[0], expectedMessage);
});

test('quotes rule fix 1 (simple)', expect => {
    const input = `{'planet': "mars"}`;
    const fixed = `{"planet": "mars"}`;
    expect.deepEqual(verifyAndFix(input), fixed);
});

test('quotes rule fix 2 (new-lines)', expect => {
    const input = `{\n    'planet': "mars"\n}`;
    const fixed = `{\n    "planet": "mars"\n}`;
    expect.deepEqual(verifyAndFix(input), fixed);
});

test('quotes rule fix 3 (spaces', expect => {
    const input = `  {  \n  'planet'  :  "mars"  \n  }  `;
    const fixed = `  {  \n  "planet"  :  "mars"  \n  }  `;
    expect.deepEqual(verifyAndFix(input), fixed);
});

test('quotes rule fix 4 (array)', expect => {
    const input = `{\n    'planets': ['mars']\n}`;
    const fixed = `{\n    "planets": ["mars"]\n}`;
    expect.deepEqual(verifyAndFix(input), fixed);
});

test('quotes rule fix 4 (nested)', expect => {
    const input = `{'planet': {'name': 'mars', 'color':'red'}}`;
    const fixed = `{"planet": {"name": "mars", "color":"red"}}`;
    expect.deepEqual(verifyAndFix(input), fixed);
});

test('quotes rule fix 5 (noop)', expect => {
    const input = `{"planet": "mars"}`;
    const fixed = `{"planet": "mars"}`;
    expect.deepEqual(verifyAndFix(input), fixed);
});

/**
 * @param {string} code
 * @returns {string}
 */
function verifyAndFix(code) {
    const linter = createLinter();
    const result = linter.verifyAndFix(code, config, {filename: 'test.json'});

    return result.output;
}

/**
 * @returns {Linter}
 */
function createLinter() {
    const linter = new Linter();

    linter.defineParser('@zeitport/eslint-json-parser', {
        parseForESLint: parseJson
    });

    return linter;
}
