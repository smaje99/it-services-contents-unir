/** @type {import("prettier").Config} */
export default {
  useTabs: false,
  printWidth: 90,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
