const {test, linter} = require('../testSandbox');

const config = {
    parser: '@zeitport/eslint-parser-json',
    rules: {
        'no-dupe-keys': ['error']
    }
};

test('lint incorrect', expect => {
    // Given
    const code = `{"mars": "red", "mars": "blue"}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'no-dupe-keys',
    };
    expect.like(messages[0], expectedMessage);
});

test('lint correct', expect => {
    // Given
    const code = `{"mars": "red", "earth": "blue"}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect.falsy(messages.length);
});
