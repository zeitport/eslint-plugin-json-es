const {linter, verifyAndFix} = require('../../testSandbox');

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        'no-extra-parens': 'error'
    }
};

test('lint correct', () => {
    // Given
    const code = `{"mars": ("red")}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        ruleId: 'no-extra-parens',
    };
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('fix', () => {
    const input = `{"mars": ("red")}`;
    const fixed = `{"mars": "red"}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});
