module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'react-app/jest'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Use numeric values for severity levels
    'at-rule-no-unknown': 0, // 0 = off (disable Tailwind CSS warnings)
    'no-unused-vars': 1,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0
  },
  overrides: [
    {
      files: ['**/*.css', '**/*.scss'],
      rules: {
        'at-rule-no-unknown': 0, // Disable for CSS files specifically
      },
    },
  ],
};
