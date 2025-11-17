import { join } from "node:path";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import { getDirname } from "cross-dirname";
import { defineConfig } from "eslint/config";
import { all } from "eslint-plugin-fast-import";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  includeIgnoreFile(join(getDirname(), ".gitignore")),
  {
    files: ["**/*.{js,mjs,jsx,ts,tsx,mts}"],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      js,
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
    },
    extends: ["js/recommended"],
    rules: {
      "simple-import-sort/imports": "error",
      "object-shorthand": "error",

      // Handled by TypeScript eslint
      "no-unused-vars": "off",
    },
  },
  all({
    entryPoints: {
      "src/app/**/page.tsx": ["default"],
      "src/app/**/layout.tsx": ["default", "metadata"],
      "*config*": ["default"],
    },
    rootDir: getDirname(),
    alias: {
      "@/*": "src/*",
    },
  }),
  eslintPluginPrettierRecommended,
  tseslint.configs.strictTypeChecked,
  {
    files: ["**/*.{ts,tsx,mts}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: getDirname(),
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports" },
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
    },
  },
  {
    // disable type-aware linting on JS files
    files: ["**/*.{jsx,mjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
]);
