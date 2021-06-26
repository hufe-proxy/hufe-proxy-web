module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'import/newline-after-import': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'no-console': 'off',
    'react/no-array-index-key': 'off',
    'no-param-reassign': 'off',
    'react-hooks/exhaustive-deps': 'off'
  },
};
