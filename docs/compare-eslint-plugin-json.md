# `eslint-plugin-json-es` vs `eslint-plugin-json`

The [eslint-plugin-json] can lint JSON files.

## Architecture

### Engine

**eslint-plugin-json-es**
> Convert the JSON into valid JavaScript and uses the [ESLint] parser [espree].

**eslint-plugin-json**
> Uses the vscode-json-languageservice to parse JSON.

### Fix

**eslint-plugin-json-es**
> YES!
> For example you can sort the keys when using [eslint-plugin-sort-keys-fix]

**eslint-plugin-json**
> NO

### Rules Configuration

**eslint-plugin-json-es**
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
|json/undefined|✔✔  no-undefined||
|json/enum-value-mismatch| ❌ | Not supported |
|json/unexpected-end-of-comment| 🟢 parser||
|json/unexpected-end-of-string| 🟢 parser||
|json/unexpected-end-of-number| 🟢 parser||
|json/invalid-unicode| ✔✔ no-irregular-whitespace| Optional: unicode-bom |
|json/invalid-escape-character| ✔ no-useless-escape||
|json/invalid-character| 🟢 parser||
|json/property-expected| 🟢 parser||
|json/comma-expected| 🟢 parser||
|json/colon-expected| 🟢 parser||
|json/value-expected| 🟢 parser||
|json/comma-or-close-backet-expected| 🟢 parser||
|json/comma-or-close-brace-expected| 🟢 parser||
|json/trailing-comma|✔✔ comma-dangle||
|json/duplicate-key|✔✔ no-dupe-keys||
|json/comment-not-permitted|✔ eslint-plugin-json-es/no-comments ||
|json/schema-resolve-error| ❌ |Schemas are not supported |


| Symbol | Description |
|---|----|
| ✔✔ | Rule Available and part of the recommended rule config |
| ✔ | Rule Available |
| 🟢 | A general parser error with exact location is provided |
| ❌ | Currently not supported or this feature works differently  |

[ESLint]: https://eslint.org/
[espree]: https://eslint.org/
[eslint-plugin-json]: https://github.com/azeemba/eslint-plugin-json
[eslint-plugin-sort-keys-fix]: https://github.com/leo-buneev/eslint-plugin-sort-keys-fix
