require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["@totominc/react", "@totominc/react/next"],

  parserOptions: {
    project: "./tsconfig.json",
  },

  rules: {
    // Remove `href` attribute when using `Link` component from Next.js
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["hrefLeft", "hrefRight"],
      "aspects": ["invalidHref", "preferButton"],
    }],
  },
};
