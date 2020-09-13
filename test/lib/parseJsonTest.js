const test = require('ava');
const Linter = require('eslint').Linter;
const {parseJson} = require('../../src/parseJson');

const config = {
    parser: '@zeitport/eslint-parser-json',
    rules: {
        quotes: ['error', 'double']
    }
};

test('parse JSON code', t => {
    // Given
    const code = createJsonCode();
    const linter = createLinter();

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    t.notDeepEqual(messages, [{fatal: true}]);
});

/**
 * @returns {Linter}
 */
function createLinter() {
    const linter =  new Linter();

    linter.defineParser('@zeitport/eslint-parser-json', {
        parseForESLint: parseJson
    });

    return linter;
}

/**
 * @returns {string}
 */
function createJsonCode() {
    const data = {
        hello: 'world'
    };

    return JSON.stringify(data, null, 4);
}
