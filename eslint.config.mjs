import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    plugins: {},
    rules: {
      "semi": ["warn", "always"]
    },
    ignores: ['node_modules/', 'dist/', '.github/']
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];