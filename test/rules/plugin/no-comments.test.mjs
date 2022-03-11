import {expect, test} from 'vitest'
import {linter} from '../../testSandbox.js';

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        'json-es/no-comments': ['error']
    }
};

test('lint JSON without a comment', () => {
    // Given
    const code = `{
        "mars": "red"
    }`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect(messages.length).toBe(0);
});

test('lint incorrect block comment', () => {
    // Given
    const code = `{
        // The martian.
        "mars": "red"
    }`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'json-es/no-comments',
    };

    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('lint incorrect line comment', () => {
    // Given
    const code = `{
        "mars": "red" // The martian.
    }`;

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        severity: 2,
        ruleId: 'json-es/no-comments',
    };

    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject(expectedMessage);
});


