import { defineConfig } from 'eslint/config';

import commonConfig from '../eslint.config.common.mjs';

export default defineConfig([
  {
    settings: {
      'import-integrity': {
        packageRootDir: import.meta.dirname,
      },
    },
  },
  ...commonConfig,
]);
