import stylisticJs from '@stylistic/eslint-plugin-js'
import typescriptEslintParser from '@typescript-eslint/parser'

export default [
  {
    files: ["src/js/**/*.ts"],
    ignores: [
      "build/**/*.js",
      "src/pug/scripts/*.js",
      "**/*.config.js",
      "!**/eslint.config.js",
    ],
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      'no-console': 1,
      'no-unused-vars': 'warn',
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
      'space-before-function-paren': ['error', 'never'],
      'semi': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
    },
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: process.env.NODE_ENV === 'console'
          ? ['./tsconfig.json']
          : ['./tsconfig.json'],
      }
    }
  }
]
