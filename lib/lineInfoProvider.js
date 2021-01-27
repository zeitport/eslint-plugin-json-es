const {Position} = require('acorn');

class LineInfoProvider {
    /**
     * @param {string} input
     */
    constructor(input) {
        /**
         * @type {!Map<number, !acorn.Position>}
         */
        this.offsetMap = createOffsetToPositionMap(input);
    }

    /**
     * @param {number} offset
     * @returns {!acorn.Position | undefined}
     */
    getLineInfo(offset) {
        return this.offsetMap.get(offset);
    }
}

/**
 * @param {string} input
 * @returns {!Map<string, !acorn.Position>}
 */
function createOffsetToPositionMap(input) {
    const offsetMap = new Map();

    let line = 1;
    let column = 0;

    for(let i = 0; i < input.length; i++) {
        offsetMap.set(i, new Position(line, column));

        let char = input[i];

        if (char === '\r' && input[i+1] === '\n') {
            line++;
            column = 0;

            // This is a 2 char line-break sequence, so we skip the next character
            i++;
        } else if (char === '\n' || char === '\u2028' || char === '\u2029') {
            line++;
            column = 0;
        } else {
            column++;
        }
    }

    // The ACORN parser can uses a location range where the "end" index can be
    // outside of the code input (length).
    // For this scenario we add an extra entry.
    offsetMap.set(input.length, new Position(line, column + 1));

    return offsetMap;
}

module.exports = {LineInfoProvider};
