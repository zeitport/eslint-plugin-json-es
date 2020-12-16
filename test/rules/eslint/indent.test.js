const {linter, verifyAndFix} = require('../../testSandbox');

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        indent: ['error', 2]
    }
};

test('lint incorrect', () => {
    // Given
    const code = `{\n"planets": "mars"\n}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        ruleId: 'indent',
    };
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('fix 1 (simple)', () => {
    const input = `{\n "planet": "mars"\n}`;
    const fixed = `{\n  "planet": "mars"\n}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});

test('fix 2 (multi-line)', () => {
    const input = `{\n"mars": "red",\n"earth":"blue"\n}`;
    const fixed = `{\n  "mars": "red",\n  "earth":"blue"\n}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});
