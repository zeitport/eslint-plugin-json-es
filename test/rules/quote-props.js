const {test, linter, verifyAndFix} = require('../testSandbox');

const config = {
    parser: '@zeitport/eslint-plugin-json',
    rules: {
        'quote-props': ['error', 'always']
    }
};

test('lint incorrect', expect => {
    // Given
    const code = `{mars: "red"}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'quote-props'
    };
    expect.like(messages[0], expectedMessage);
});

test('fix 1 (simple)', expect => {
    const input = `{planet: "mars"}`;
    const fixed = `{"planet": "mars"}`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});
