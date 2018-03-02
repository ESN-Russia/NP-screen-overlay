module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  rules: {
    quotes: ["error", "double"],
    curly: ["error", "all"],
    semi: ["error", "always"],
    "max-len": [
      "error",
      {
        code: 100,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    "react/jsx-filename-extension": 0, // We use .js.
    "no-console": 0, // We have a lot of console.log().
    "react/prop-types": 0, // We don't use them for now.
    "no-use-before-define": 0, // For StyleSheets.
    "no-mixed-operators": 0, // Pretty dumb rule that denies "a * b / c".
    "no-nested-ternary": 0, // They're actually quite readable.
    "jsx-a11y/accessible-emoji": 0, // Why not to write emojis in plain text?
    "no-restricted-syntax": 0, // There's no big issue with for-of and for-in in React Native.
  },
  env: {
    browser: true,
  },
};
