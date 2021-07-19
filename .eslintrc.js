module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-undef': 0,
    'no-shadow': 0,
    'no-restricted-globals': 0,
    'no-restricted-syntax': 0,
    'prefer-destructuring': 0,
    'for-direction': 0,
    'no-new': 0,
  },
};
