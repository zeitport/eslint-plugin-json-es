const {linter, verifyAndFix} = require('../../testSandbox');

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        'comma-dangle': ['error', 'never']
    }
};

test('lint incorrect', () => {
    // Given
    const code = `{"mars": "red",}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'comma-dangle',
    };
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('lint correct', () => {
    // Given
    const code = `{"mars": "red"}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect(messages.length);
});

test('fix 1 (simple)', () => {
    const input = `{"mars": "red",}`;
    const fixed = `{"mars": "red"}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});

test('fix 2 (multi-line)', () => {
    const input = `{\n"mars": "red",\n"earth":"blue",\n}`;
    const fixed = `{\n"mars": "red",\n"earth":"blue"\n}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});



