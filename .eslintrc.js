module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['jest'],
  globals: {
    ZoomMtg: 'readable'
  },
  rules: {
    'space-before-function-paren': 'off',
    'multiline-ternary': 'off',
    'n/no-callback-literal': 'off',
    'accessor-pairs': 'off',
    'no-prototype-builtins': 'off',
    'no-return-assign': 'off',
    'no-multi-spaces': [
      'error',
      {
        exceptions: {
          ImportDeclaration: true,
          VariableDeclarator: true
        }
      }
    ]
  }
}
