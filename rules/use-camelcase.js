'use strict';

//------------------------------------------------------------------------------
// Rule Definition
// Base on eslint camelcase rule.
// https://github.com/eslint/eslint/blob/1579ce05cbb523cb5b04ff77fab06ba1ecd18dce/lib/rules/camelcase.js
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Every property should be camelCase.',
            category: 'Possible Errors',
            recommended: false
        },
        schema: [
            {
                type: "object",
                properties: {
                    allow: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        minItems: 0,
                        uniqueItems: true
                    }
                },
                additionalProperties: false
            }
        ]
    },
    create: function(context) {
        const options = context.options[0] || {};
        const allow = options.allow || [];

        /**
         * Checks if a string contains an underscore and isn't all upper-case
         * @param {string} name The string to check.
         * @returns {boolean} if the string is underscored
         * @private
         */
        function isUnderscored(name) {
            return name.includes('_') || name.includes('-') || name === name.toUpperCase();
        }

        /**
         *
         * Checks if a string match the ignore list
         * @param {string} name The string to check.
         * @returns {boolean} if the string is ignored
         * @private
         */
        function isAllowed(name) {
            return allow.some(
                entry => name === entry || name.match(new RegExp(entry, "u"))
            );
        }

        /**
         * Checks if a given name is good or not.
         * @param {string} name The name to check.
         * @returns {boolean} `true` if the name is good.
         * @private
         */
        function isGoodName(name) {
            return !isUnderscored(name) || isAllowed(name);
        }

        return {
            [["ObjectExpression > Property"]](node) {
                const keyName = node.key.value || '';

                if (!isGoodName(keyName)) {
                    context.report({
                        node,
                        message: `Identifier '${keyName}' is not in camel case.`
                    });
                }
            }
        };
    }
};
