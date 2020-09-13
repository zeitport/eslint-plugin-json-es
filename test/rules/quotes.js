const {test, linter, verifyAndFix} = require('../testSandbox');

const config = {
    parser: '@zeitport/eslint-json-parser',
    rules: {
        quotes: ['error', 'double']
    }
};

test('lint incorrect', expect => {
    // Given
    const code = `{'mars': 'red'}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'quotes'
    };
    expect.like(messages[0], expectedMessage);
});

test('fix 1 (simple)', expect => {
    const input = `{'planet': "mars"}`;
    const fixed = `{"planet": "mars"}`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});

test('fix 2 (new-lines)', expect => {
    const input = `{\n    'planet': "mars"\n}`;
    const fixed = `{\n    "planet": "mars"\n}`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});

test('fix 3 (spaces', expect => {
    const input = `  {  \n  'planet'  :  "mars"  \n  }  `;
    const fixed = `  {  \n  "planet"  :  "mars"  \n  }  `;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});

test('fix 4 (array)', expect => {
    const input = `{\n    'planets': ['mars']\n}`;
    const fixed = `{\n    "planets": ["mars"]\n}`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});

test('fix 5 (nested)', expect => {
    const input = `{'planet': {'name': 'mars', 'color':'red'}}`;
    const fixed = `{"planet": {"name": "mars", "color":"red"}}`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});

test('fix 6 (noop)', expect => {
    const input = `{"planet": "mars"}`;
    const fixed = `{"planet": "mars"}`;
    expect.deepEqual(verifyAndFix(input, config), fixed);
});
