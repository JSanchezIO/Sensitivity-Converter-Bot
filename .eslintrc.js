module.exports = {
  env: {
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: ['field', 'constructor', 'private-method', 'public-method'],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'class-methods-use-this': [
      'error',
      { exceptMethods: ['convertFromTrueSensitivity', 'convertToTrueSensitivity'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'no-console': 'error',
    'no-underscore-dangle': [
      'error',
      {
        allow: [],
        allowAfterThis: true,
        allowAfterSuper: false,
        enforceInMethodNames: false,
      },
    ],
    'no-unused-vars': 'off',
    'sort-vars': ['error', { ignoreCase: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
