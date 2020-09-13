const {test, linter, verifyAndFix} = require('../testSandbox');

const config = {
    parser: '@zeitport/eslint-parser-json',
    rules: {
        'no-multiple-empty-lines': ['error', {max: 1}]
    }
};

test('lint incorrect', expect => {
    // Given
    const code = `{"mars": "red"}\n\n\n`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'no-multiple-empty-lines',
    };
    expect.like(messages[0], expectedMessage);
});

test('lint correct', expect => {
    // Given
    const code = `{"mars": "red"}\n\n`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect.falsy(messages.length);
});

test('fix 1 (simple)', expect => {
    const input = `{"mars": "red"}\n\n\n`;
    const fixed = `{"mars": "red"}\n\n`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});

