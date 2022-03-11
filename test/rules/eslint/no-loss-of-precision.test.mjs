import {expect, test} from 'vitest'
import {linter} from '../../testSandbox.js';

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        'no-loss-of-precision': ['error']
    }
};

test('lint incorrect', () => {
    // Given
    const code = `{"size": 1234567890123456789.0}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'no-loss-of-precision',
    };
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('lint correct', () => {
    // Given
    const code = `{"size": 12345}`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect(messages.length).toBe(0);
});
