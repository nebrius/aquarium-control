import { getDirname } from 'cross-dirname';
import { defineConfig } from 'eslint/config';
import { all } from 'eslint-plugin-fast-import';

import commonConfig from '../eslint.config.common.mjs';

export default defineConfig([
  ...commonConfig,
  all({
    entryPoints: {
      '*config*': ['default'],
    },
    rootDir: getDirname(),
  }),
  {
    files: ['src/components/ui/**/*.{ts,tsx,mts}'],
    rules: {
      'fast-import/no-unused-exports': 'off',
    },
  },
]);
