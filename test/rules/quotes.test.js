const {linter, verifyAndFix} = require('../testSandbox');

const config = {
    parser: '@zeitport/eslint-plugin-json',
    rules: {
        quotes: ['error', 'double']
    }
};

test('lint incorrect', () => {
    // Given
    const code = `{'mars': 'red'}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'quotes'
    };
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('fix 1 (simple)', () => {
    const input = `{'planet': "mars"}`;
    const fixed = `{"planet": "mars"}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});

test('fix 2 (new-lines)', () => {
    const input = `{\n    'planet': "mars"\n}`;
    const fixed = `{\n    "planet": "mars"\n}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});

test('fix 3 (spaces', () => {
    const input = `  {  \n  'planet'  :  "mars"  \n  }  `;
    const fixed = `  {  \n  "planet"  :  "mars"  \n  }  `;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});

test('fix 4 (array)', () => {
    const input = `{\n    'planets': ['mars']\n}`;
    const fixed = `{\n    "planets": ["mars"]\n}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});

test('fix 5 (nested)', () => {
    const input = `{'planet': {'name': 'mars', 'color':'red'}}`;
    const fixed = `{"planet": {"name": "mars", "color":"red"}}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});

test('fix 6 (noop)', () => {
    const input = `{"planet": "mars"}`;
    const fixed = `{"planet": "mars"}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});
