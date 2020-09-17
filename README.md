[![NPM version](https://img.shields.io/npm/v/@zeitport/eslint-parser-json.svg)](https://img.shields.io/npm/v/@zeitport/eslint-parser-json)
[![CI status](https://github.com/zeitport/eslint-parser-json/workflows/CI/badge.svg?branch=master&event=push)](https://github.com/zeitport/eslint-parser-json/actions?query=workflow%3ACI)

# @zeitport/eslint-parser-json

A JSON parser for [ESLint] that works with existing ESLint rules or your custom rules.

## Installation

```
npm install @zeitport/eslint-parser-json
```

## Configuration and Usage

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
    "overrides": [{
        "files": ["*.json"],
        "parser": "@zeitport/eslint-parser-json"
    }]
}
```

## Example
See the [example branch] for a small complete example with one JSON file and an [ESLint] configuration.

## Rules Configurations

### Recommended
[./config/recommended.js](./config/recommended.js)

| Auto-fix | Rule                   |
|----------|------------------------|
|🔧| comma-dangle              |
| | no-dupe-keys              |
| | no-irregular-whitespace   |
| | no-loss-of-precision      |
| | no-undefined              |
|🔧| quotes                   |

### Readable
Based on the recommended rules with stylistic aspects.

[./config/readable.js](./config/readable.js)

| Auto-fix | Rule                   | Comment |
|----------|------------------------|---------------------|
|🔧| indent | 4 |
|🔧| no-multiple-empty-lines | |
| | sort-keys |Alternative with fix [eslint-plugin-sort-keys-fix] |
|🔧| no-multiple-empty-lines | |

## Other JSON plugins/parsers

- [Compare @zeitport/eslint-parser-json with eslint-plugin-json](docs/compare-eslint-plugin-json.md);

[ESLint]: https://eslint.org/
[custom parser]: https://eslint.org/docs/developer-guide/working-with-custom-parsers
[eslint-plugin-json]: https://github.com/azeemba/eslint-plugin-json
[eslint-plugin-jsonc]: https://github.com/ota-meshi/eslint-plugin-jsonc
[eslint-plugin-sort-keys-fix]: https://github.com/leo-buneev/eslint-plugin-sort-keys-fix
[example branch]: https://github.com/zeitport/eslint-parser-json/tree/example
