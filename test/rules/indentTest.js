const test = require('ava');
const Linter = require('eslint').Linter;
const {parseJson} = require('../../src/parseJson');

const config = {
    parser: '@zeitport/eslint-json-parser',
    rules: {
        indent: ['error', 2]
    }
};

test('indent rule verify', expect => {
    // Given
    const code = `{\n"planets": "mars"\n}`;
    const linter = createLinter();

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        ruleId: 'indent',
        severity: 2,
        line: 2,
        endLine: 2,
        column: 1,
        endColumn: 1,
        fix: {
            range: [2, 2],
            text: '  '
        },
        nodeType: 'String'
    };
    expect.like(messages[0], expectedMessage);
});

test('indent rule fix 1 (simple)', expect => {
    const input = `{\n "planet": "mars"\n}`;
    const fixed = `{\n  "planet": "mars"\n}`;
    expect.deepEqual(verifyAndFix(input), fixed);
});

test('indent rule fix 2 (multi-line)', expect => {
    const input = `{\n"mars": "red",\n"earth":"blue"\n}`;
    const fixed = `{\n  "mars": "red",\n  "earth":"blue"\n}`;
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
