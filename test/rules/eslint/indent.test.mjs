import {expect, test} from 'vitest'
import {linter, verifyAndFix} from '../../testSandbox.js';

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        indent: ['error', 4]
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

test('lint the correct comment indent', () => {
    // Given
    const code = [
        '{',
        '    // The red planet',
        '    "name": "mars"',
        '}'
    ].join('\n');

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    expect(messages).to.deep.equal([]);
});

test('lint the incorrect comment indent', () => {
    // Given
    const code = [
        '{',
        '  // The red planet',
        '    "name": "mars"',
        '}'
    ].join('\n');

    // When
    const messages = linter.verify(code, config, {filename: 'test.json'});

    // Then
    const expectedMessage = {
        ruleId: 'indent',
        message: 'Expected indentation of 4 spaces but found 2.'
    };
    expect(messages[0]).toMatchObject(expectedMessage);
});

test('fix 1 (simple)', () => {
    const input = `{\n "planet": "mars"\n}`;
    const fixed = `{\n    "planet": "mars"\n}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});

test('fix 2 (multi-line)', () => {
    const input = `{\n"mars": "red",\n"earth":"blue"\n}`;
    const fixed = `{\n    "mars": "red",\n    "earth":"blue"\n}`;
    expect(verifyAndFix(input, config)).toEqual(fixed);
});

test('fixes the correct comment indent', () => {
    // Given
    const input = [
        '{',
        '                  // The red planet',
        '    "name": "mars"',
        '}'
    ].join('\n');

    // When
    const fixedCode = verifyAndFix(input, config);

    // Then
    const expectedCode = [
        '{',
        '    // The red planet',
        '    "name": "mars"',
        '}'
    ].join('\n');
    expect(fixedCode).toEqual(expectedCode);
});
