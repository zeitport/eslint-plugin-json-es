const {linter, verifyAndFix} = require('../../testSandbox');

const config = {
    parser: '@zeitport/eslint-plugin-json',
    rules: {
        'no-multiple-empty-lines': ['error', {max: 1}]
    }
};

test('lint incorrect', () => {
    // Given
    const code = `{"mars": "red"}\n\n\n`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'no-multiple-empty-lines',
    };
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('lint correct', () => {
    // Given
    const code = `{"mars": "red"}\n\n`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect(messages.length).toBe(0);
});

test('fix 1 (simple)', () => {
    const input = `{"mars": "red"}\n\n\n`;
    const fixed = `{"mars": "red"}\n\n`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});

