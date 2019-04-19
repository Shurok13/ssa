module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': ['standard', "eslint:recommended", "plugin:react/recommended"],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    "fetch": false,
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  "parser": "babel-eslint",
  'plugins': [
    'react',
    "react-native"
  ],
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // default to latest and warns if missing
                           // It will default to "detect" in the future
    },
    "propWrapperFunctions": [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      {"property": "freeze", "object": "Object"},
      {"property": "myFavoriteWrapper"}
    ],
    "linkComponents": [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      {"name": "Link", "linkAttribute": "to"}
    ]
  },
  'rules': {
    "arrow-parens": ["error", "as-needed"],
    "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
    "comma-dangle": ["warn", "always-multiline"],
    "eol-last": ["error", "always"],
    "object-curly-spacing": ["warn", "always"],
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-unused-vars": ["warn"],
    "no-console": ["warn"],
    "no-debugger": ["warn"],
    "no-trailing-spaces": ["warn"],
    "no-constant-condition": [0],
    "no-multi-spaces": ["warn"],
    "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 1 }],
    "no-extra-semi": ["warn"],
    "no-case-declarations": 0,
    "prefer-destructuring": ["error", {"object": true, "array": true}],
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": [0],
    "import/extensions": ["error", { "js": "never", "json": "always"}],
    "import/prefer-default-export": 0,
    "jsx-quotes": ["warn", "prefer-double"],
    "jsx-a11y/label-has-for": [0],
    "jsx-a11y/anchor-has-content": 0,
    "react/no-children-prop": 0,
    "react/prop-types": 1,
    "react/no-danger": 0,
    "react/no-array-index-key": 0,
    "react/forbid-prop-types": ["error", { "forbid": ["object", "any"] }],
    "react/jsx-curly-spacing": [2, "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-indent": [1, 4],
    'react/jsx-closing-bracket-location': [1, "line-aligned"],
    "react/jsx-indent-props": [2, 4],
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": false
    }],
  }
};
