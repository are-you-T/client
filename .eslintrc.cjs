module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier", // prettier와 충돌 방지
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // 필요시 규칙 추가
    "react/react-in-jsx-scope": "off", // React 17+ 에서는 필요 없음
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};