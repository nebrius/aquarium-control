import { join } from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import importIntegrityPlugin from 'import-integrity-lint';
import tseslint from 'typescript-eslint';

export default defineConfig([
  includeIgnoreFile(join(import.meta.dirname, '.gitignore')),
  {
    settings: {
      'import-integrity': {
        monorepoRootDir: import.meta.dirname,
      },
    },
  },
  importIntegrityPlugin.configs.monorepoRecommended,
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tseslint.parser,
    },
    linterOptions: {
      // This minimal config produces many false positives for unused
      // disable directives, since they likely are used in package-specific
      // configs. We disable the check to avoid noise.
      reportUnusedDisableDirectives: 'off',
    },
    plugins: {
      // We have to enable the typescript-eslint plugin so eslint-disable
      // pragmas point to valid rules, even if they aren't enabled
      '@typescript-eslint': tseslint.plugin,
      // Enable any other plugins used in package-specific configs here
    },
  },
]);
