# eslint-json-parser
A JSON parser for [ESLint].

## Install

```
npm install @zeitport/eslint-json-parser
```

## Usage

[ESLint] configuration
```
{
    "parser": "@zeitport/eslint-json-parser,
    "rules": {
    }
}
```


## Tested rules

| Rule              | Option                            |
| ---               | ---                               |
| comma-dangle      | `['error', 'never']`              |
| indent            | `['error', 2]`                    |
| no-undefined      | `['error']`                       |
| quotes            | `['error', 'double']`             |


[ESLint]: https://eslint.org/


## Compare to eslint-plugin-json
