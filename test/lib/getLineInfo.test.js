const {parseJson} = require('../../lib/parseJson');
const {getLineInfo} = require('../../lib/getLineInfo');

test('getLineInfo() returns line 1, column 2', () => {
    // Given
    const code = 'line1\nline2\n'

    // When
    const position = getLineInfo(code, 2);

    // Then
    expect(position.line).toEqual(1);
    expect(position.column).toEqual(2);
});

test('getLineInfo() returns line 2, column 0', () => {
    // Given
    const code = 'line1\nline2\n'

    // When
    const position = getLineInfo(code, 6);

    // Then
    expect(position.line).toEqual(2);
    expect(position.column).toEqual(0);
});

test('getLineInfo() returns line 3, column 0', () => {
    // Given
    const code = 'line1\r\nline2\r\nline3'

    // When
    const position = getLineInfo(code, 14);

    // Then
    expect(position.line).toEqual(3);
    expect(position.column).toEqual(0);
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
