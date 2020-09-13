const {test, linter, verifyAndFix} = require('../testSandbox');

const config = {
    parser: '@zeitport/eslint-json-parser',
    rules: {
        indent: ['error', 2]
    }
};

test('lint incorrect', expect => {
    // Given
    const code = `{\n"planets": "mars"\n}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        ruleId: 'indent',
    };
    expect.like(messages[0], expectedMessage);
});

test('fix 1 (simple)', expect => {
    const input = `{\n "planet": "mars"\n}`;
    const fixed = `{\n  "planet": "mars"\n}`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});

test('fix 2 (multi-line)', expect => {
    const input = `{\n"mars": "red",\n"earth":"blue"\n}`;
    const fixed = `{\n  "mars": "red",\n  "earth":"blue"\n}`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});
