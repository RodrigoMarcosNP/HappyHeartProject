const OFF = 0;
//const WARNING = 1;
const ERROR = 2;

module.exports = {
  root: true,
  extends: ['satya164'],
  plugins: ['simple-import-sort', '@stylistic'],
  settings: {
    react: {
      version: '18',
    },
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': ERROR,
    '@typescript-eslint/no-restricted-types': ERROR,
    'import-x/no-default-export': OFF,
    'simple-import-sort/imports': ERROR,
    'simple-import-sort/exports': ERROR,
    'no-restricted-imports': [
      ERROR,
      {
        patterns: ['@react-navigation/*/*'],
        paths: [
          {
            name: 'react-native-svg',
            importNames: ['Text'],
            message: 'Please import `Text` from `react-native` instead.',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['./packages/**/*.{tsx,ts}'],
      parser: 'hermes-eslint',
    },
  ],
};
