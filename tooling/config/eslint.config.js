import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
const flatConfig = [
  { ignores: ["**/node_modules", "**/dist", "**/build", "**/coverage"] },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

export default flatConfig;
