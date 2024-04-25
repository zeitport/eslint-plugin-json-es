[![NPM version](https://img.shields.io/npm/v/eslint-plugin-json-es.svg)](https://www.npmjs.com/package/eslint-plugin-json-es)
[![CI status](https://github.com/zeitport/eslint-plugin-json/workflows/CI/badge.svg?branch=main&event=push)](https://github.com/zeitport/eslint-plugin-json/actions?query=workflow%3ACI)
[![CodeQL](https://github.com/zeitport/eslint-plugin-json-es/workflows/CodeQL/badge.svg)](https://github.com/zeitport/eslint-plugin-json/actions?query=workflow%3ACodeQL)
[![Downloads](https://img.shields.io/npm/dm/eslint-plugin-json-es.svg)](https://www.npmjs.com/package/eslint-plugin-json-es)
![NPM](https://img.shields.io/npm/l/eslint-plugin-json-es)

# eslint-plugin-json-es

A JSON parser for [ESLint] that works with a lot of existing ESLint rules or your custom rules.

## Installation

```
npm install eslint-plugin-json-es --save-dev
```

## Configure ESLint

This is an example [ESLint] configuration for all *.json files.
It _extends_ the recommended rules for JSON.

```json
{
    "overrides": [{
        "files": ["*.json"],
        "parser": "eslint-plugin-json-es",
        "extends": "plugin:eslint-plugin-json-es/recommended",
        "rules": {
        }
    }]
}
```

## Examples
See the [example branch] for different use cases and [ESLint] configurations.

## Alternative JSON Plugins

There are three different ways how to add JSON linting to [ESLint].
Select the package that fits your needs:

|                           | [eslint-plugin-json-es](https://www.npmjs.com/package/eslint-plugin-json-es) | [eslint-plugin-json](https://www.npmjs.com/package/eslint-plugin-json) | [eslint-plugin-jsonc](https://www.npmjs.com/package/eslint-plugin-jsonc)       |
| ---                       | ----------------------------- | ------------------------- | ------------------------- |
| Version                   | ![NPM version](https://img.shields.io/npm/v/eslint-plugin-json-es.svg) | ![NPM version](https://img.shields.io/npm/v/eslint-plugin-json.svg) | ![NPM version](https://img.shields.io/npm/v/eslint-plugin-jsonc.svg)         |
| Engine                    | ESLint espree parser          | VSCode JSON Validation    | Custom AST parser         |
| ESLint version            | >7.0.0                        | ?                         | >6.0.0                    |
| Custom rules              | ✔                             | ❌                        | ✔ (1)                     |
| Use existing ESLint rules | ✔ (2)                         | ❌                        | ❌                         |
| Fix Code                  | ✔                             | ❌                        | ✔ (partly)                |
| Rule compare guide        | -                             | [Compare](docs/compare-eslint-plugin-json.md) | #TODO :-(    |

_(1) Uses custom AST node types_<br>
_(2) Not every ESLint rule makes sense for JSON_<br>

## Rules Configurations

### Recommended
[./config/recommended.js](./config/recommended.js)

| Auto-fix | Rule                   | Version       |
|----------|----------------------------| ----------|
|🔧| comma-dangle                        | > 1.3.0   |
| | no-dupe-keys                        | > 1.3.0   |
|🔧| no-extra-parens                     | > 1.4.0  |
| | no-irregular-whitespace             | > 1.3.0   |
| | no-loss-of-precision                | > 1.3.0   |
| | no-undefined                        | > 1.3.0   |
|🔧| quotes                              | > 1.3.0   |
|🔧| quote-props                         | > 1.3.0   |

### Readable
Based on the recommended rules with stylistic aspects.

[./config/style.js](./config/style.js)

| Auto-fix | Rule                   | Comment |
|----------|------------------------|---------------------|
|🔧| indent | 4 |
|🔧| no-multiple-empty-lines | |
| | sort-keys |Alternative with fix [eslint-plugin-sort-keys-fix] |

## Optional Rules
A list of optional rules that can be added to your configuration.

### `json-es/use-camelcase`
The "original" ESLint camelcase rule does not work with JSON files.

A custom 'use-camelcase' [rule](./rules/use-camelcase.js) is available.
Based on the ESLint camelcase rule with minor adjustments.

__Configuration__
```json
{
    "rules": {
        "json-es/use-camelcase": ["error", {"allow": ["FOO", "[regex]*"]}]
    }
}
```

[ESLint]: https://eslint.org/
[custom parser]: https://eslint.org/docs/developer-guide/working-with-custom-parsers
[eslint-plugin-json]: https://github.com/azeemba/eslint-plugin-json
[eslint-plugin-jsonc]: https://github.com/ota-meshi/eslint-plugin-jsonc
[eslint-plugin-sort-keys-fix]: https://github.com/leo-buneev/eslint-plugin-sort-keys-fix
[example branch]: https://github.com/zeitport/eslint-plugin-json/tree/example
