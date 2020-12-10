# get-started example

## Installation

We need eslint and @zeitport/eslint-plugin-json to lint (or fix) our JSON file.

```
npm install eslint --save-dev
npm install @zeitport/eslint-plugin-json --save-dev
```

## [JSON file]

This is an example of an invalid JSON file. It has a comma (`,`) after every `name` property. This is a very common and hard to spot problem when manually editing a JSON file with copy&paste.

```json
{
    "planets": [
        {
            "color": "red",
            "name": "mars",
        },
        {
            "color": "blue",
            "name": "earth",
        }
    ]
}
```

## [ESLint configuration file]

The _.eslintrc_ configuration file uses [comma-dangle] rule that is provided by ESLint.

```json
{
    "overrides": [{
        "files": ["*.json"],
        "parser": "@zeitport/eslint-plugin-json",
        "rules":{
                "comma-dangle": ["error", "never"]
            }
    }]
}
```

## Lint

To lint the json file run:

```
cd get-started
eslint planets.json
```

```cmd
M:\github\zeitport\eslint-plugin-json\example\get-started\planets.json
  5:27  error  Unexpected trailing comma  comma-dangle
  9:28  error  Unexpected trailing comma  comma-dangle

✖ 2 problems (2 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.
```

## Auto-Fix

To fix the json file and remove the dangle commas run:

```
eslint planets.json --fix
```

## Recommended Rules

This plugin provides a list of recommended rules to find common problems in JSON files. Use the "extends" config to get started.
You are not limited to just the rules of the recommended config, you can still add your own rules.

```json
{
    "overrides": [{
        "files": ["*.json"],
        "parser": "@zeitport/eslint-plugin-json",
        "extends": "plugin:@zeitport/eslint-plugin-json/recommended"
    }]
}
```


# Resources
[Configuring ESLint](https://eslint.org/docs/user-guide/configuring)


[JSON file]: https://github.com/zeitport/eslint-plugin-json/tree/example/get-started/planets.json
[ESLint configuration file]: https://github.com/zeitport/eslint-plugin-json/tree/example/get-started/.eslintrc
[comma-dangle]: https://eslint.org/docs/rules/comma-dangle
