# get-started example

## Installation

We need eslint and @zeitport/eslint-parser-json to lint (or fix) our JSON file.

```
npm install eslint --save-dev
npm install @zeitport/eslint-parser-json --save-dev
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
        "parser": "@zeitport/eslint-parser-json"
    }],
    "rules":{
        "comma-dangle": ["error", "never"]
    }
}
```

This project contains a JSON file and an ESLint configuration using @zeitport/eslint-parser-json.

## Lint

To lint the json file run:

```
cd get-started
eslint planets.json
```

## Auto-Fix

To fix the json file and remove the dangle commas run:

```
eslint planets.json --fix
```

# Resources
[Configuring ESLint](https://eslint.org/docs/user-guide/configuring)


[JSON file]: https://github.com/zeitport/eslint-parser-json/tree/example/get-started/planets.json
[eslint configuration file]: https://github.com/zeitport/eslint-parser-json/tree/example/get-started/.eslintrc
[comma-dangle]: https://eslint.org/docs/rules/comma-dangle
