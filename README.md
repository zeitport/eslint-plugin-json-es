[![NPM version](https://img.shields.io/npm/v/@zeitport/eslint-parser-json.svg)](https://img.shields.io/npm/v/@zeitport/eslint-parser-json)

# @zeitport/eslint-parser-json

A JSON parser for [ESLint].

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
    "overrides": {
        "files": ["*.json"],
        "parser": "@zeitport/eslint-parser-json"
    }
}
```

## Rules Configurations

### Recommended

|   |   | Rule                   |
|---|---|------------------------|
|✓|🔧| comma-dangle              |
| |🔧| indent                    |
|✓| | no-dupe-keys              |
|✓| | no-loss-of-precision      |
|✓| | no-undefined              |
|✓|🔧| quotes                   |

### Readable

|   |   | Rule                   | Comment |
|---|---|------------------------|---------------------|
| |🔧| indent ||
|✓|🔧| no-multiple-empty-lines | |
|✓| | sort-keys |Alternative with fix [eslint-plugin-sort-keys-fix] |

## Other JSON plugins/parsers

### eslint-plugin-json
[eslint-plugin-json]

### eslint-plugin-jsonc
[eslint-plugin-jsonc]

[ESLint]: https://eslint.org/
[custom parser]: https://eslint.org/docs/developer-guide/working-with-custom-parsers
[eslint-plugin-json]: https://github.com/azeemba/eslint-plugin-json
[eslint-plugin-jsonc]: https://github.com/ota-meshi/eslint-plugin-jsonc
[eslint-plugin-sort-keys-fix]: https://github.com/leo-buneev/eslint-plugin-sort-keys-fix
