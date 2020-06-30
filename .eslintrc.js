module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/indent": [1, 2, {
      CallExpression: { arguments: 1 },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      SwitchCase: 1
    }],
    semi: [2, "always"],
    "function-paren-newline": [2, { "minItems": 3 }],
    quotes: [2, "double"],
    "no-var": 2,
    curly: 2,
    "array-callback-return": 2,
    "default-case": 2,
    "dot-notation": 1,
    "dot-location": [2, "property"],
    eqeqeq: 2,
    "newline-per-chained-call": [2, { ignoreChainWithDepth: 1 }],
    "max-len": [2, { code: 80 }],
    "arrow-parens": 2,
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  env: {
    es6: true,
    node: true,
    mocha: true,
    browser: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
};
