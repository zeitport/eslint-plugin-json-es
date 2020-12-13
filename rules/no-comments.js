'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: 'recommended',
        docs: {
            description: 'disallow comments',
            category: 'Possible Errors',
            recommended: true
        },
        fixable: 'code',
        schema: []
    },
    create: function(context) {
        const comments = context.getAllComments();
        if (comments) {
            for (const comment of comments) {
                context.report({
                    loc: comment.loc,
                    message: 'This comment is not allowed.'
                });
            }
        }

        return {};
    }
};
