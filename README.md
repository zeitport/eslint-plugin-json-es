[![NPM version](https://img.shields.io/npm/v/eslint-plugin-json-es.svg)](https://img.shields.io/npm/v/eslint-plugin-json-es)
[![CI status](https://github.com/zeitport/eslint-plugin-json/workflows/CI/badge.svg?branch=master&event=push)](https://github.com/zeitport/eslint-plugin-json/actions?query=workflow%3ACI)

# eslint-plugin-json-es

A JSON parser for [ESLint] that works with existing ESLint rules or your custom rules.

## Installation

```
npm install eslint-plugin-json-es
```

## Configuration and Usage

[ESLint] configuration
```
{
    "parser": "eslint-plugin-json-es",
    "rules": {
    }
}
```

Or use the `overrides` [ESLint] configuration to use the JSON parser only for `.json` files.

```
{
    "overrides": [{
        "files": ["*.json"],
        "parser": "eslint-plugin-json-es"
    }]
}
```

## Example
See the [example branch] for a small complete example with one JSON file and an [ESLint] configuration.

## Rules Configurations

### Recommended
[./config/recommended.js](./config/recommended.js)

| Auto-fix | Rule                   | Version       |
|----------|----------------------------| ----------|
|🔧| comma-dangle                        | > 1.3.0   |
| | no-dupe-keys                        | > 1.3.0   |
|🔧| no-extra-parens                     | > 1.4.0 ⭐ |
| | no-irregular-whitespace             | > 1.3.0   |
| | no-loss-of-precision                | > 1.3.0   |
| | no-undefined                        | > 1.3.0   |
|🔧| quotes                              | > 1.3.0   |
|🔧| quote-props                         | > 1.3.0   |

⭐ Latest change to the recommended rules configuration

### Readable
Based on the recommended rules with stylistic aspects.

[./config/readable.js](./config/readable.js)

| Auto-fix | Rule                   | Comment |
|----------|------------------------|---------------------|
|🔧| indent | 4 |
|🔧| no-multiple-empty-lines | |
| | sort-keys |Alternative with fix [eslint-plugin-sort-keys-fix] |

## Alternative JSON plugins/parsers

Here are already some ESLint plugins to lint JSON.

- [eslint-plugin-json](https://www.npmjs.com/package/eslint-plugin-json)
- [eslint-plugin-jsonc](https://www.npmjs.com/package/eslint-plugin-jsonc)

|                           | eslint-plugin-json-es         | eslint-plugin-json        | eslint-plugin-jsonc       |
| ---                       | ----------------------------- | ------------------------- | ------------------------- |
| Engine                    | Uses ESLint's espree parser   | Custom parser             | Custom AST parser         |
| Custom rules              | ✔                             | ❌                        | ✔                         |
| Use existing ESLint rules | ✔ (only JSON compatible ones) | ❌                        | ❌                         |
| Special JSON rules        | ❌ (planned)                   | ✔                        | ✔                         |
| ESLint version            | >7.0.0                        | ?                         | >6.0.0                    |


Deep compare guides:
- [Compare eslint-plugin-json-es with eslint-plugin-json](docs/compare-eslint-plugin-json.md);

[ESLint]: https://eslint.org/
[custom parser]: https://eslint.org/docs/developer-guide/working-with-custom-parsers
[eslint-plugin-json]: https://github.com/azeemba/eslint-plugin-json
[eslint-plugin-jsonc]: https://github.com/ota-meshi/eslint-plugin-jsonc
[eslint-plugin-sort-keys-fix]: https://github.com/leo-buneev/eslint-plugin-sort-keys-fix
[example branch]: https://github.com/zeitport/eslint-plugin-json/tree/example
