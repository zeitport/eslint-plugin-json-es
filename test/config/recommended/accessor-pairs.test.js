const {linter} = require('../../testSandbox');
const {rules} = require('../../../config/recommended');

const config = {
    parser: 'eslint-plugin-json-es',
    rules
};

test('accessor-pairs rule is disabled', () => {
    // Then
    expect(rules['accessor-pairs']).toEqual('off');
});

test('lint correct', () => {
    // Given
    const code = `{"mars": "red"}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect(messages.length).toEqual(0);
});
