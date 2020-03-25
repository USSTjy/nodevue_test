module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "linebreak-style": [0, "error", "windows"], //允许windows开发环境
    "no-trailing-spaces": 0,
    // "space-in-parens": [0],
    // "vue/script-indent": ["off", 0]
  },
  overrides: [{
    "files": ["*.vue"],
    "rules": {
      "indent": [0],
      "vue/script-indent": ["error", 4, {
        "baseIndent": 1
      }]
    }
  }],

};
