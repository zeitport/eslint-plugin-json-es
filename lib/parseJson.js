const espree = require('espree');
const evk = require('eslint-visitor-keys');
const acorn = require('acorn');

function parseJson(code, options) {
    const validCode = `(${code});`;
    const ast = espree.parse(validCode, options);
    const context = {code, ast};

    fixProgram(context);
    fixTokens(context);
    fixNodes(context);

    return {
        ast,
        services: {},
        scopeManager: null,
        visitorKeys: null
    };
}

function fixProgram({ast}) {
    ast.end = ast.end - 3;
    ast.range[1] = ast.end

    // Remove Expression Statement and move ObjectExpression into body
    ast.body[0] = ast.body[0].expression;
}

function fixTokens({code, ast}) {
    // Remove the first '(' and the last two tokens ')', ';'
    ast.tokens = ast.tokens.slice(1, ast.tokens.length - 2);

    // Fix the location of the tokens
    ast.tokens.forEach(token => {
        token.start = token.start - 1;
        token.end = token.end - 1;
        token.range = [token.start, token.end];

        if (token.loc) {
            token.loc.start = acorn.getLineInfo(code, token.start);
            token.loc.end = acorn.getLineInfo(code, token.end);
        }
    });
}

function fixNodes({code, ast}) {
    traverseAst(ast.body[0], node => fixLocation({node, code}));
}

function traverseAst(node, callback) {
    callback(node);

    const keys = evk.KEYS[node.type];

    for(const key of keys) {
        const next = node[key];

        if (Array.isArray(next)) {
            for(const child of next) {
                traverseAst(child, callback);
            }
        } else if (next.type) {
            traverseAst(next, callback);
        }
    }
}

function fixLocation({node, code}) {
    if (node.start) {
        node.start = node.start - 1;
        node.range[0] = node.start;
    }

    if (node.end) {
        node.end = node.end - 1;
        node.range[1] = node.end;
    }

    if (node.loc) {
        node.loc.start = acorn.getLineInfo(code, node.start);
        node.loc.end = acorn.getLineInfo(code, node.end);
    }
}

module.exports = {parseJson};
