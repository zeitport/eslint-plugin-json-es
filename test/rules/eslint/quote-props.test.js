const {linter, verifyAndFix} = require('../../testSandbox');

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        'quote-props': ['error', 'always']
    }
};

test('lint incorrect', () => {
    // Given
    const code = `{mars: "red"}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'quote-props'
    };
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('fix 1 (simple)', () => {
    const input = `{planet: "mars"}`;
    const fixed = `{"planet": "mars"}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});
