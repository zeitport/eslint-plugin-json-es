import {expect, test} from 'vitest'
import {linter} from '../../testSandbox.js';

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        'no-dupe-keys': ['error']
    }
};

test('lint incorrect', () => {
    // Given
    const code = `{"mars": "red", "mars": "blue"}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'no-dupe-keys',
    };
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('lint correct', () => {
    // Given
    const code = `{"mars": "red", "earth": "blue"}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect(messages.length).toBe(0);
});
