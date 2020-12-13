const {linter} = require('../testSandbox');

const config = {
    parser: '@zeitport/eslint-plugin-json',
    rules: {
        'no-undefined': ['error']
    }
};

test('lint incorrect', () => {
    // Given
    const code = `{"mars": undefined}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'no-undefined',
    };
    expect(messages[0]).toMatchObject(expectedMessage);
});
