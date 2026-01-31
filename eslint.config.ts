// eslint.config.mjs
// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

import tseslint from "typescript-eslint";
import tsParser from '@typescript-eslint/parser';

import eslintPluginAstro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';

import markdown from "@eslint/markdown";
import * as mdx from 'eslint-plugin-mdx'

import css from "@eslint/css";

import { importX } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

import simpleImportSort from 'eslint-plugin-simple-import-sort';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  // ignores
  {
    ignores: ['node_modules/**', 'dist/**', '.astro/**', 'env.d.ts', 'eslint.config.ts', 'prettier.config.mjs'],
  },

  // base recommended
  js.configs.recommended,

  // Import-X
  {
    plugins: { 'import-x': importX as unknown },
    extends: ['import-x/flat/recommended'],
    rules: {
      // Ejemplo de regla personalizada para import-x (a ajustar según necesidades)
      'import-x/no-dynamic-require': 'warn',
    },
  },

  // TypeScript (type-aware)
  // (equivalente a tu "parserOptions.project": "tsconfig.json")
  ...tseslint.configs.recommendedTypeChecked,

  // Astro (flat configs)
  ...eslintPluginAstro.configs['flat/recommended'],

  // Desactiva reglas que chocan con Prettier
  eslintConfigPrettier,

  // Tu configuración custom (reglas, settings, plugins)
  {
    files: ['**/*.{js,jsx,ts,tsx,astro}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.astro'],
      }
    },
    settings: {
      'import/extensions': ['.js', '.jsx'],
      'import/resolver': {
        typescript: { alwaysTryTypes: true },
        node: { paths: ['src'], extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        alias: true,
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: ['./tsconfig.eslint.json'],
          extensions: [".astro", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".mts", ".cts"],
        }),
      ],
      'import-x/core-modules': [
        'astro',
        'astro:content',
      ]
    },
    plugins: {
      js,
      'prettier': prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'max-len': ['error', 100],
      quotes: [2, 'single', { avoidEscape: true }],
      indent: ['warn', 2, { SwitchCase: 1 }],

      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      curly: 'error',
      'jsx-quotes': ['warn', 'prefer-single'],

      'import/extensions': 'off',
    },
    extends: ["js/recommended"]
  },
  // TypeScript (non type-aware)
  tseslint.configs.recommended,
  // Markdown
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/commonmark", extends: ["markdown/recommended"] },
  // CSS
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  // Parser para .astro (manteniendo tu override)
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser, // scripts dentro de Astro como TS
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      'astro/no-set-html-directive': 'error',
    },
  },
  // MDX
  {
    ...mdx.flat,
    // optional, if you want to lint code blocks at the same
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
      // optional, if you want to disable language mapper, set it to `false`
      // if you want to override the default language mapper inside, you can provide your own
      languageMapper: {},
      // optional, same as the `parserOptions.ignoreRemarkConfig`, you have to specify it twice unfortunately
      ignoreRemarkConfig: true,
      // optional, same as the `parserOptions.remarkConfigPath`, you have to specify it twice unfortunately
      remarkConfigPath: null,
    }),
  },
  {
    ...mdx.flatCodeBlocks,
    rules: {
      ...mdx.flatCodeBlocks.rules,
      // if you want to override some rules for code blocks
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
]);
