import css from '@eslint/css';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const codeFiles = ['**/*.{js,mjs,cjs,ts}'];

export default tseslint.config(
  {
    ignores: ['dist/', 'node_modules/', 'playwright-report/', 'test-results/', 'screenshots/'],
  },
  ...[js.configs.recommended, ...tseslint.configs.recommended].map((config) => ({
    ...config,
    files: codeFiles,
  })),
  {
    files: codeFiles,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  // CSS: @eslint/css (stylelint'in yerine; bkz. README "Bağımlılık güvenliği").
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    languageOptions: { tolerant: false },
    rules: {
      ...css.configs.recommended.rules,
      'css/no-important': 'error',
      'css/use-baseline': ['warn', { available: 'newly' }],
    },
  },
);
