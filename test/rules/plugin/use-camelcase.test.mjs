import {describe, expect, test} from 'vitest'
import {linter} from '../../testSandbox.js';

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        'json-es/use-camelcase': ['error']
    }
};

describe('use-camelcase', () => {
    describe('correct', () => {
        test('camelCase', () => {
            // Given
            const json = JSON.stringify({'camelCase': 'value'});

            // When
            const messages = linter.verify(json, config, {filename: 'test.json'});

            // Then
            expect(messages.length).toEqual(0);
        });

        test('alllowercase', () => {
            // Given
            const json = JSON.stringify({'alllowercase': 'value'});

            // When
            const messages = linter.verify(json, config, {filename: 'test.json'});

            // Then
            expect(messages.length).toEqual(0);
        });
    });

    describe('correct + allow', () => {
        test('_privateField', () => {
            // Given
            const json = JSON.stringify({'_privateField': 'value'});

            const allowConfig = structuredClone(config);
            allowConfig.rules['json-es/use-camelcase'] = ['error', {allow: ['_privateField']}];

            // When
            const messages = linter.verify(json, allowConfig, {filename: 'test.json'});

            // Then
            expect(messages.length).toEqual(0);
        });

        test('A_CONSTANT', () => {
            // Given
            const json = JSON.stringify({'A_CONSTANT': 'value'});

            const allowConfig = structuredClone(config);
            allowConfig.rules['json-es/use-camelcase'] = ['error', {allow: ['[A-Z_]*']}];

            // When
            const messages = linter.verify(json, allowConfig, {filename: 'test.json'});

            // Then
            expect(messages.length).toEqual(0);
        });
    });

    describe('incorrect', () => {
        test('UPPER_case', () => {
            // Given
            const json = JSON.stringify({'UPPER_case': 'value'});

            // When
            const messages = linter.verify(json, config, {filename: 'test.json'});

            // Then
            const expectedMessage = {
                severity: 2,
                ruleId: 'json-es/use-camelcase',
                message: 'Identifier \'UPPER_case\' is not in camel case.'
            };

            expect(messages.length).toEqual(1);
            expect(messages[0]).toMatchObject(expectedMessage);
        });

        test('A_CONSTANT', () => {
            // Given
            const json = JSON.stringify({'A_CONSTANT': 'value'});

            // When
            const messages = linter.verify(json, config, {filename: 'test.json'});

            // Then
            const expectedMessage = {
                severity: 2,
                ruleId: 'json-es/use-camelcase',
                message: 'Identifier \'A_CONSTANT\' is not in camel case.'
            };

            expect(messages.length).toEqual(1);
            expect(messages[0]).toMatchObject(expectedMessage);
        });

        test('kebab-case', () => {
            // Given
            const json = JSON.stringify({'kebab-case': 'value'});

            // When
            const messages = linter.verify(json, config, {filename: 'test.json'});

            // Then
            const expectedMessage = {
                severity: 2,
                ruleId: 'json-es/use-camelcase',
                message: 'Identifier \'kebab-case\' is not in camel case.'
            };

            expect(messages.length).toEqual(1);
            expect(messages[0]).toMatchObject(expectedMessage);
        });

        test('ALLUPPERCASE', () => {
            // Given
            const json = JSON.stringify({'ALLUPPERCASE': 'value'});

            // When
            const messages = linter.verify(json, config, {filename: 'test.json'});

            // Then
            const expectedMessage = {
                severity: 2,
                ruleId: 'json-es/use-camelcase',
                message: 'Identifier \'ALLUPPERCASE\' is not in camel case.'
            };

            expect(messages.length).toEqual(1);
            expect(messages[0]).toMatchObject(expectedMessage);
        });
    });
});


