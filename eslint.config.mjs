import { join } from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import fastImportPlugin from 'eslint-plugin-fast-import';
import tseslint from 'typescript-eslint';

export default defineConfig([
  includeIgnoreFile(join(import.meta.dirname, '.gitignore')),
  {
    settings: {
      'fast-import': {
        monorepoRootDir: import.meta.dirname,
      },
    },
  },
  fastImportPlugin.configs.monorepoRecommended,
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tseslint.parser,
    },
    linterOptions: {
      // This config is minimal, so this finds a lot of false positives
      reportUnusedDisableDirectives: 'off',
    },
    plugins: {
      // We have to enable this so eslint-disable pragmas point to valid rules, even if they aren't enabled
      '@typescript-eslint': tseslint.plugin,
    },
  },
]);
