# Create a custom ESLint rule to lint JSON

This is a step-by-step guide on how to create an ESLint rule to check a JSON file.
After reading this guide, also take a look at the ESLint "[Working with Rules]" documentation.

## Creating the `no-underscore` rule

We do not want that any property key of our JSON to start with an underscore (`_`), because in our current use case this properties are reserved for private data.

### 👎 Example of incorrect JSON
```
{
    "_id": "id-000"
}
```

### 👍 Example of correct JSON
```
{
    "id": "id-000"
}
```

## Creating the plugin

Before we create the rule we need to setup a plugin package. ESLint requires that the package starts with `eslint-plugin`. Using an package scope is optional.
We create a folder with a package.json and call our plugin `eslint-plugin-json-es-test`.

```
{
    "name": "eslint-plugin-json-es-test",
    "version": "1.0.0",
    "main": "index.js"
}
```

The index.js file returns a list of a rules.package

```
const noUnderscoreRule = require('./no-underscore');

module.exports = {
    rules: {
        'no-underscore': noUnderscoreRule
    }
};
```

## Writing the ESLint rule

Time to read some documentation at [Working with Rules].
Checkout the rule implementation at [/eslint-plugins-json-test/no-underscore.js]

- 🚀 Use the [AST explorer](https://astexplorer.net/) to parse JavaScript code
- 🔥 Put `()` around your JSON to create valid JavaScript. [AST Explorer Example](https://astexplorer.net/#/gist/006da4d4da90e46469df37a78596f11a/057ea1a4eb374bb46468eb04237d946a798fe762)
- 💡 Select the node type you want to check. In our example we want to check all `Property` nodes.

## Installation

No we need to install the runtime (ESLint), the JSON parser (eslint-plugin-json-es) and our ESLint plugin.

```
npm install eslint --save-dev
npm install eslint-plugin-json-es --save-dev
```

In our use case the `eslint-plugin` is located in a sub folder.

```
npm install eslint-plugin-json-test --save-dev
```

Checkout the root `package.json` file of this example branch to see all the installed dependencies.

## [JSON file]

```json
{
    "planets": [
        {
            "_id": "id-000-mars",
            "name": "mars",
        },
        {
            "_id": "id-001-earth",
            "name": "earth",
        }
    ]
}
```

## [ESLint configuration file]

The _.eslintrc_ configuration file uses our custom [no-underscore] rule that is provided by our plugin.

```json
{
    "plugins": [
        "eslint-plugin-json-es-test"
    ],
    "overrides": [{
        "files": ["*.json"],
        "parser": "eslint-plugin-json-es"
    }],
    "rules": {
        "@zeitport/json-test/no-underscore": ["error"]
    }
}
```
💡 In the rules section you can reference to the rules of multiple plugins. Based on the ESLint naming convention a reference shall not contain the `eslint-plugin` prefix.

## Lint

To lint the json file run:

```
cd custom-json-rule
eslint planets.json
```

```cmd
M:\github\zeitport\eslint-plugin-json\example\custom-json-rule\planets.json
  4:13  error  The property "_id" starts with a reserved character "_"  @zeitport/json-test/no-underscore
  8:13  error  The property "_id" starts with a reserved character "_"  @zeitport/json-test/no-underscore

✖ 2 problems (2 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.
```

## Auto-Fix

To fix the JSON file and remove the leading underscores (`_`):

```
eslint planets.json --fix
```

# Resources
- [Working with Plugins]
- [Working with Rules]


[JSON file]: https://github.com/zeitport/eslint-plugin-json/tree/example/custom-json-rule/planets.json
[ESLint configuration file]: https://github.com/zeitport/eslint-plugin-json/tree/example/custom-json-rule/.eslintrc
[Working with Rules]: https://eslint.org/docs/developer-guide/working-with-rules
[Working with Plugins]: https://eslint.org/docs/developer-guide/working-with-plugins
[no-underscore]: https://github.com/zeitport/eslint-plugin-json/blob/example/eslint-plugin-json-test/no-underscore.js
[/eslint-plugins-json-test/no-underscore.js]: https://github.com/zeitport/eslint-plugin-json/blob/example/eslint-plugin-json-test/no-underscore.js
