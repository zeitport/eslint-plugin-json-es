[![NPM version](https://img.shields.io/npm/v/@zeitport/eslint-parser-json.svg)](https://img.shields.io/npm/v/@zeitport/eslint-parser-json)

# @zeitport/eslint-parser-json

A JSON parser for [ESLint].

## Install

```
npm install @zeitport/eslint-parser-json
```

## Usage

[ESLint] configuration
```
{
    "parser": "@zeitport/eslint-parser-json",
    "rules": {
    }
}
```

Or use the `overrides` [ESLint] configuration to use the JSON parser only for `.json` files.

```
{
    "overrides": {
        "files": ["*.json"],
        "parser": "@zeitport/eslint-parser-json"
    }
}
```

## Recommended rules

|   |   | Rule                  |
|---|---|-------------------------------------------|
|✓|🔧| comma-dangle          |
| |🔧| indent                |
|✓| | no-dupe-keys          |
|✓| | no-loss-of-precision  |
|✓| | no-undefined          |
|✓|🔧| quotes                |




## Alternatives

### eslint-plugin-json



[ESLint]: https://eslint.org/
[custom parser]: https://eslint.org/docs/developer-guide/working-with-custom-parsers
[eslint-plugin-json]: https://github.com/azeemba/eslint-plugin-json
