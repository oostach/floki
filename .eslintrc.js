module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'jest',
    'react'
  ],
  globals: {
    ZoomMtg: 'readable'
  },
  ignorePatterns: [
    '**/vendor/bundle/**/*.js'
  ],
  rules: {
    'space-before-function-paren': 'off',
    'multiline-ternary': 'off',
    'n/no-callback-literal': 'off',
    'accessor-pairs': 'off',
    'no-prototype-builtins': 'off',
    'no-return-assign': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-multi-spaces': [
      'error',
      {
        exceptions: {
          ImportDeclaration: true,
          VariableDeclarator: true
        }
      }
    ],
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: true }
    ]
  }
}
