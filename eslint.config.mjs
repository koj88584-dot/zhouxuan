import js from '@eslint/js'
import nextPlugin from 'eslint-config-next'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['.next/**', 'node_modules/**', 'coverage/**', 'playwright-report/**', '.reference/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextPlugin,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
