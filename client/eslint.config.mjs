import { getDirname } from 'cross-dirname';
import { defineConfig } from 'eslint/config';
import { all } from 'eslint-plugin-fast-import';

import commonConfig from '../eslint.config.common.mjs';

export default defineConfig([
  ...commonConfig,
  all({
    entryPoints: {
      'src/types.ts': ['*'],
      'src/app/**/page.tsx': ['default'],
      'src/app/**/layout.tsx': ['default', 'metadata'],
      'src/app/**/route.ts': ['GET', 'PUT', 'POST'],
      '*config*': ['default'],
    },
    rootDir: getDirname(),
    alias: {
      '@/*': 'src/*',
    },
  }),
  {
    files: ['src/components/ui/**/*.{ts,tsx,mts}'],
    rules: {
      'fast-import/no-unused-exports': 'off',
    },
  },
]);
