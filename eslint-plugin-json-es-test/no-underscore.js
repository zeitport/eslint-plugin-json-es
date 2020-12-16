'use strict';

module.exports = {
    meta: {
        type: 'suggestion',
        fixable: 'code',
        schema: []
    },
    create: function(context) {
        return {
            Property: function(propertyNode) {
                const propertyKey = propertyNode.key.value;
                if (propertyKey && propertyKey[0] === '_') {
                    context.report({
                        node: propertyNode,
                        message: `The property "${propertyKey}" starts with a reserved character "_".`,
                        fix: function(fixer) {
                            const fixedPropertyKey = '"' + propertyKey.slice(1) + '"';

                            // Replace the property.key
                            return fixer.replaceText(propertyNode.key, fixedPropertyKey);
                        }
                    });
                }
            }
        };
    }
};
