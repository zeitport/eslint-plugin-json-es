const {test, linter} = require('../testSandbox');

const config = {
    parser: '@zeitport/eslint-parser-json',
    rules: {
        'no-loss-of-precision': ['error']
    }
};

test('lint incorrect', expect => {
    // Given
    const code = `{"size": 1234567890123456789.0}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'no-loss-of-precision',
    };
    expect.like(messages[0], expectedMessage);
});

test('lint correct', expect => {
    // Given
    const code = `{"size": 12345}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect.falsy(messages.length);
});
