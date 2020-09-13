const {test, linter, verifyAndFix} = require('../testSandbox');

const config = {
    parser: '@zeitport/eslint-json-parser',
    rules: {
        'comma-dangle': ['error', 'never']
    }
};

test('lint incorrect', expect => {
    // Given
    const code = `{"mars": "red",}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'comma-dangle',
    };
    expect.like(messages[0], expectedMessage);
});

test('lint correct', expect => {
    // Given
    const code = `{"mars": "red"}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect.falsy(messages.length);
});

test('fix 1 (simple)', expect => {
    const input = `{"mars": "red",}`;
    const fixed = `{"mars": "red"}`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});

test('fix 2 (multi-line)', expect => {
    const input = `{\n"mars": "red",\n"earth":"blue",\n}`;
    const fixed = `{\n"mars": "red",\n"earth":"blue"\n}`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});



