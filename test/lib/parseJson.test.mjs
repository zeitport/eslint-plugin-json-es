import {expect, test} from 'vitest'
import {parseJson} from '../../lib/parseJson.js';

const parserOptions = {
    ecmaVersion: undefined,
    loc: true,
    range: true,
    raw: true,
    tokens: true,
    comment: true,
    eslintVisitorKeys: true,
    eslintScopeManager: true,
    filePath: 'test.json'
}

test('parseJson returns AST', () => {
    // Given
    const code = createJson();

    // When
    const parseObject = parseJson(code, parserOptions);

    // Then
    expect(typeof parseObject.ast).to.equal('object');
});

test('parseJson with a string', () => {
    // Given
    const code = '\n"validJSON"\n';

    // When
    const parseObject = parseJson(code, parserOptions);

    // Then
    expect(parseObject.ast).toBeTruthy();
});

test('parseJson fixes token locations', () => {
    // Given
    const code = createJson();

    // When
    const parseObject = parseJson(code, parserOptions);
    const tokenSummary = parseObject.ast.tokens.map(nodeLocSummary);

    // Then
    expect(tokenSummary).toMatchObject(getExpectedTokenSummary());
});

test('parseJson fixes comment locations', () => {
    // Given
    const code = `{\n  // comment\n  "name": "mars"\n}`;

    // When
    const parseObject = parseJson(code, parserOptions);
    const comment = parseObject.ast.comments[0];

    // Then
    const expectedCommentNode = {
        start: 4,
        end: 14
    };
    expect(comment).toMatchObject(expectedCommentNode);
});

test('parseJson does not fix comments when ast does not parse comments', () => {
    // Given
    const customOptions = {...parserOptions};
    customOptions.comment = false;
    const code = `{\n  // comment\n  "name": "mars"\n}`;

    // When
    const parseObject = parseJson(code, customOptions);

    // Then
    expect(parseObject.ast.comments).to.equal(undefined);
});

test('parseJson with invalid code throws error', () => {
    // Given
    const code = `{`;

    // When
    const parse = () => parseJson(code, parserOptions);

    // Then
    expect(parse).toThrow('Unexpected end of JSON input');
});

/**
 * @returns {string}
 */
function createJson() {
    const data = {
        planets: [
            {
                name: 'Mars',
                color: 'red'
            },
            {
                name: 'Earth',
                moons: 1,
                dinos: [],
                hasOxygen: true,
            }
        ]
    };

    return JSON.stringify(data, null, 4);
}

function nodeLocSummary(node) {
    return {
        start: {
            line: node.loc.start.line,
            column: node.loc.start.column
        },
        end: {
            line: node.loc.end.line,
            column: node.loc.end.column
        }
    }
}

function getExpectedTokenSummary() {
    return [
        { start: { line: 1, column: 0 }, end: { line: 1, column: 1 } },
        { start: { line: 2, column: 4 }, end: { line: 2, column: 13 } },
        { start: { line: 2, column: 13 }, end: { line: 2, column: 14 } },
        { start: { line: 2, column: 15 }, end: { line: 2, column: 16 } },
        { start: { line: 3, column: 8 }, end: { line: 3, column: 9 } },
        { start: { line: 4, column: 12 }, end: { line: 4, column: 18 } },
        { start: { line: 4, column: 18 }, end: { line: 4, column: 19 } },
        { start: { line: 4, column: 20 }, end: { line: 4, column: 26 } },
        { start: { line: 4, column: 26 }, end: { line: 4, column: 27 } },
        { start: { line: 5, column: 12 }, end: { line: 5, column: 19 } },
        { start: { line: 5, column: 19 }, end: { line: 5, column: 20 } },
        { start: { line: 5, column: 21 }, end: { line: 5, column: 26 } },
        { start: { line: 6, column: 8 }, end: { line: 6, column: 9 } },
        { start: { line: 6, column: 9 }, end: { line: 6, column: 10 } },
        { start: { line: 7, column: 8 }, end: { line: 7, column: 9 } },
        { start: { line: 8, column: 12 }, end: { line: 8, column: 18 } },
        { start: { line: 8, column: 18 }, end: { line: 8, column: 19 } },
        { start: { line: 8, column: 20 }, end: { line: 8, column: 27 } },
        { start: { line: 8, column: 27 }, end: { line: 8, column: 28 } },
        { start: { line: 9, column: 12 }, end: { line: 9, column: 19 } },
        { start: { line: 9, column: 19 }, end: { line: 9, column: 20 } },
        { start: { line: 9, column: 21 }, end: { line: 9, column: 22 } },
        { start: { line: 9, column: 22 }, end: { line: 9, column: 23 } },
        { start: { line: 10, column: 12 }, end: { line: 10, column: 19 } },
        { start: { line: 10, column: 19 }, end: { line: 10, column: 20 } },
        { start: { line: 10, column: 21 }, end: { line: 10, column: 22 } },
        { start: { line: 10, column: 22 }, end: { line: 10, column: 23 } },
        { start: { line: 10, column: 23 }, end: { line: 10, column: 24 } },
        { start: { line: 11, column: 12 }, end: { line: 11, column: 23 } },
        { start: { line: 11, column: 23 }, end: { line: 11, column: 24 } },
        { start: { line: 11, column: 25 }, end: { line: 11, column: 29 } },
        { start: { line: 12, column: 8 }, end: { line: 12, column: 9 } },
        { start: { line: 13, column: 4 }, end: { line: 13, column: 5 } },
        { start: { line: 14, column: 0 }, end: { line: 14, column: 1 } }
    ];
}
