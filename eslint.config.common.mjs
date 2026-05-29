import { join } from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import fastImportPlugin from 'import-integrity-lint';
import importPlugin from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  includeIgnoreFile(join(import.meta.dirname, '.gitignore')),
  {
    files: ['**/*.{js,mjs,jsx,ts,tsx,mts}'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      js,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    extends: ['js/recommended'],
    rules: {
      'simple-import-sort/imports': 'error',
      'object-shorthand': 'error',

      // Handled by TypeScript eslint
      'no-unused-vars': 'off',
    },
  },
  eslintPluginPrettierRecommended,
  tseslint.configs.strictTypeChecked,
  {
    files: ['**/*.{ts,tsx,mts}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
    },
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.{jsx,mjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  fastImportPlugin.configs.recommended,
];
