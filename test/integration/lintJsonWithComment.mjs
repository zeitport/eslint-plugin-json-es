import {Linter} from 'eslint';
import {parseForESLint} from '../../index.js';

const linter = new Linter();
linter.defineParser('eslint-plugin-json-es', {
    parseForESLint
});

const config = {
    parser: 'eslint-plugin-json-es',
    rules: {
        indent: ['error', 4]
    }
};

const code = [
    '{',
    '    // The red planet',
    '    "name": "mars"',
    '}'
].join('\n');

const result = linter.verify(code, config, {filename: 'test.json'});
console.log(result);
