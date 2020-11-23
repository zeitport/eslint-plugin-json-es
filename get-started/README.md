# get-started example

## Installation

We need eslint and @zeitport/eslint-parser-json to lint (or fix) our JSON file.

```
npm install eslint --save-dev
npm install @zeitport/eslint-parser-json --save-dev
```

## Create an example [JSON file]

This JSON file is not valid, because it has a comma (,) after the last property value of a _planet_.

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

## Create an [ESLint configuration file]

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

## Fix

To fix the json file and remove the dangle commas run:

```
eslint planets.json --fix
```

[JSON file]: https://github.com/zeitport/eslint-parser-json/tree/example/get-started/planets.json
[eslint configuration file]: https://github.com/zeitport/eslint-parser-json/tree/example/get-started/.eslintrc
[comma-dangle]: https://eslint.org/docs/rules/comma-dangle
