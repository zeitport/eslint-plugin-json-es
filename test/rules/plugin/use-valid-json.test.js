const {linter, verifyAndFix} = require('../../testSandbox');

const config = {
    parser: '@zeitport/eslint-plugin-json',
    rules: {
        '@zeitport/json/use-valid-json': ['error']
    }
};

test('lint incorrect JSON', () => {
    // Given
    const code = `{
        "earth": "blue",
        "mars": red
    }`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: '@zeitport/json/use-valid-json',
        line: 3,
        column: 17
    };

    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject(expectedMessage);
});
