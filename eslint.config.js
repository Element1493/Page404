import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: [
      "src/**/*.{ts,tsx}"
    ]
  },{
    languageOptions: {
      globals: globals.browser
    }
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    }
  }
];