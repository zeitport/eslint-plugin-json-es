const {LineInfoProvider} = require('../../lib/lineInfoProvider');

test('getLineInfo() returns line 1, column 2', () => {
    // Given
    const code = 'line1\nline2\n'
    const lineInfoProvider = new LineInfoProvider(code);

    // When
    const position = lineInfoProvider.getLineInfo(2);

    // Then
    expect(position.line).toEqual(1);
    expect(position.column).toEqual(2);
});

test('getLineInfo() returns line 2, column 0', () => {
    // Given
    const code = 'line1\nline2\n'
    const lineInfoProvider = new LineInfoProvider(code);

    // When
    const position = lineInfoProvider.getLineInfo(6);

    // Then
    expect(position.line).toEqual(2);
    expect(position.column).toEqual(0);
});

test('getLineInfo() returns line 3, column 0', () => {
    // Given
    const code = 'line1\r\nline2\r\nline3'
    const lineInfoProvider = new LineInfoProvider(code);

    // When
    const position = lineInfoProvider.getLineInfo(14);

    // Then
    expect(position.line).toEqual(3);
    expect(position.column).toEqual(0);
});
