import {expect, test} from 'vitest'
import {linter, verifyAndFix} from '../../testSandbox.js';

/**
 * In JavaScript property values can be wrapped in parens.
 * JSON does not allow it. For strict linting do not use the "space-in-parens" rule provided by ESLint.
 * It is recommended to use the "no-extra-parens" rule.
 * @type {{parser: string, rules: {"space-in-parens": [string, string, {exceptions: [string]}]}}}
 */

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        'space-in-parens': ['error', 'always', { exceptions: [ 'empty' ] } ]
    }
};

test('lint correct', () => {
    // Given
    const code = `{"mars": "red"}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect(messages.length).toEqual(0)
});

test('fix is not applied when using "no-extra-parens"', () => {
    const config = {
        parser: 'eslint-plugin-json-es',
        rules: {
            'no-extra-parens': 'error',
            'space-in-parens': ['error', 'always', { exceptions: [ 'empty' ] } ]
        }
    };
    const input = `{"mars": ("red")}`;
    const fixed = `{"mars": "red"}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});
