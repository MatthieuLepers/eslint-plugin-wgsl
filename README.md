# eslint-plugin-wgsl

An ESLint plugin for validating WGSL shaders using [`wgsl-linter`](https://github.com/elringus/wgsl-linter).

## Features

- Validate standalone `.wgsl` shader files.
- Validate `wgsl` tagged template literals in JavaScript and TypeScript.
- Report WGSL diagnostics as ESLint errors.
- Compatible with ESLint 8.
- Integrates into existing ESLint workflows.

## Requirements

- Node.js
- ESLint 8

## Installation

Install the plugin in your project:

```bash
npm install --save-dev eslint-plugin-wgsl eslint@^8.57.0
```

## Configuration

This plugin provides a custom parser for standalone `.wgsl` files and two independent rules.

### Standalone WGSL files

In your `.eslintrc.cjs` configuration:

```javascript
module.exports = {
  overrides: [
    {
      files: ["**/*.wgsl"],
      parser: "eslint-plugin-wgsl/parser",
      plugins: ["wgsl"],
      rules: {
        "wgsl/valid-wgsl": "error",
      },
    },
  ],
};
```

The custom parser allows ESLint to process WGSL files without interpreting their contents as JavaScript.

### WGSL template literals in JavaScript and TypeScript

To validate `wgsl` tagged template literals, enable the `valid-wgsl-template` rule for JavaScript and TypeScript files:

```javascript
module.exports = {
  plugins: ["wgsl"],
  overrides: [
    {
      files: ["**/*.wgsl"],
      parser: "eslint-plugin-wgsl/parser",
      rules: {
        "wgsl/valid-wgsl": "error",
      },
    },
    {
      files: ["**/*.{js,ts,jsx,tsx}"],
      rules: {
        "wgsl/valid-wgsl-template": "error",
      },
    },
  ],
};
```

The rule validates tagged templates such as:

```typescript
const shader = wgsl`
  @compute @workgroup_size(64)
  fn main() {
    // WGSL shader code
  }
`;
```

Other tagged templates, such as `sql\`...\``, are ignored.

**Templates containing interpolations are currently skipped.** For example, `wgsl\`let count = ${count}u;\`` is not validated by this rule.

## Usage

Run ESLint on your project:

```bash
npx eslint "src/**/*.{wgsl,js,ts,jsx,tsx}"
```

Or add a script to your `package.json`:

```json
{
  "scripts": {
    "lint:wgsl": "eslint \"src/**/*.{wgsl,js,ts,jsx,tsx}\""
  }
}
```

Then run:

```bash
npm run lint:wgsl
```

Adjust the glob patterns to match your project structure.

## Rules

| Rule | Description |
|---|---|
| `wgsl/valid-wgsl` | Validates standalone `.wgsl` files. |
| `wgsl/valid-wgsl-template` | Validates `wgsl` tagged templates without interpolations in JavaScript and TypeScript files. |

Both rules report diagnostics from `wgsl-linter` as ESLint errors.

## Limitations

- Template literals containing `${...}` interpolations are skipped.
- Automatic fixes are not currently provided.
- WGSL analysis is delegated to `wgsl-linter`.

## Development

Install dependencies:

```bash
npm install
```

Type-check the project:

```bash
npm run typecheck
```

Build the plugin:

```bash
npm run build
```

## License

This project is distributed under the MIT License. See [LICENSE](LICENSE.md) for details.
