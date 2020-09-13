# `eslint-parser-json` vs `eslint-plugin-json`

The [eslint-plugin-json] can lint JSON files.

## Architecture

### Engine

**eslint-parser-json**
> Uses the [ESLint] parser [espree] with tiny modifications (3 characters difference)

**eslint-plugin-json**
> Uses the vscode-json-languageservice to parse JSON.

### Fix

**eslint-parser-json**
> YES!
> For example you can sort the keys when using [eslint-plugin-sort-keys-fix]

**eslint-plugin-json**
> NO

### Rules Configuration

**eslint-parser-json**
> Rules can be configured.
> You can use the built-in [ESLint] rules.
> You can write your own rules or use rules from other [ESLint] plugins.

**eslint-plugin-json**
> Rules can be configured.
> You are limited to the given rule set. (See Migration table)
> You cannot write custom rules.

## Migration

| eslint-plugin-json        | ESLint rule           | Comment               |
|---------------------------|-----------------------|-----------------------|
|json/undefined|no-undefined| | |
|json/enum-value-mismatch| |🧪 Open|
|json/unexpected-end-of-comment| |📢 General parse error|
|json/unexpected-end-of-string| |📢 General parse error|
|json/unexpected-end-of-number| |📢 General parse error|
|json/invalid-unicode|unicode-bom, no-irregular-whitespace| |
|json/invalid-escape-character|no-useless-escape| |
|json/invalid-character| |🧪 Open|
|json/property-expected| |🧪 Open|
|json/comma-expected| |📢 General parse error|
|json/colon-expected| |📢 General parse error|
|json/value-expected| |📢 General parse error|
|json/comma-or-close-backet-expected| |📢 General parse error|
|json/comma-or-close-brace-expected| |📢 General parse error|
|json/trailing-comma|comma-dangle| |
|json/duplicate-key|no-dupe-keys| |
|json/comment-not-permitted| |🛠 A new rule needs to be implemented |
|json/schema-resolve-error| |Schemas are not supported |

[ESLint]: https://eslint.org/
[espree]: https://eslint.org/
[eslint-plugin-json]: https://github.com/azeemba/eslint-plugin-json
[eslint-plugin-sort-keys-fix]: https://github.com/leo-buneev/eslint-plugin-sort-keys-fix
