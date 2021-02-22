const {linter, verifyAndFix} = require('../../testSandbox');

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        'json-es/use-valid-json': ['error']
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
        ruleId: 'json-es/use-valid-json',
        line: 3,
        column: 17
    };

    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject(expectedMessage);
});


test('lint incorrect JSON shall return JSON.parse() error message', () => {
    // Given
    const code = `{`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: null,
        line: 1,
        column: 3,
        message: 'Parsing error: Unexpected end of JSON input'
    };

    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('lint incorrect JSON shall return JSON.parse() error message', () => {
    // Given
    const code = `{"a":3})(`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'json-es/use-valid-json',
        line: 1,
        column: 8,
        message: 'Unexpected token ) in JSON at position 7'
    };

    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('lint incorrect JSON shall return JSON.parse() error message for line 2', () => {
    // Given
    const code = `{"a": 100, \n    "b": 100. }`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'json-es/use-valid-json',
        line: 2,
        column: 14,
        message: 'Unexpected token   in JSON at position 25'
    };

    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject(expectedMessage);
});
