const {linter, verifyAndFix} = require('../../testSandbox');

const config = {
    parser: '@zeitport/eslint-plugin-json',
    rules: {
        '@zeitport/json/no-comments': ['error']
    }
};

test('lint incorrect block comment', () => {
    // Given
    const code = `{
        // The martian.
        "mars": "red"
    }`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: '@zeitport/json/no-comments',
    };

    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('lint incorrect line comment', () => {
    // Given
    const code = `{
        "mars": "red" // The martian.
    }`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: '@zeitport/json/no-comments',
    };

    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject(expectedMessage);
});


