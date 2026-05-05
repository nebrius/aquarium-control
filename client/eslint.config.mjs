import { defineConfig } from 'eslint/config';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

import commonConfig from '../eslint.config.common.mjs';

export default defineConfig([
  {
    settings: {
      'fast-import': {
        packageRootDir: import.meta.dirname,
      },
    },
  },
  ...commonConfig,
  {
    // shadcn generates this folder and exports everything by default; many
    // exports are intentionally unused until a consumer pulls them in.
    files: ['src/components/ui/**/*.{ts,tsx,mts}'],
    rules: {
      'fast-import/no-unused-exports': 'off',
    },
  },
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
]);
