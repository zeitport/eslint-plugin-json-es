const {parseJson} = require('./lib/parseJson');
const recommendedConfig = require('./config/recommended');
const style = require('./config/style');

module.exports = {
    parseForESLint: parseJson,
    configs: {
        recommended: recommendedConfig,
        style: style
    }
};
