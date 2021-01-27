const {Position} = require('acorn');

const lineBreak = /\r\n?|\n|\u2028|\u2029/;
const lineBreakG = new RegExp(lineBreak.source, "g");

/**
 * @param {string} input
 * @param {number} offset
 * @returns {acorn.Position}
 */
function getLineInfo(input, offset) {
    for (let line = 1, current = 0; ;) {
        lineBreakG.lastIndex = current;

        const match = lineBreakG.exec(input);

        if (match && match.index < offset) {
            ++line;
            current = match.index + match[0].length;
        } else {
            return new Position(line, offset - current)
        }
    }
}

module.exports = {getLineInfo};
