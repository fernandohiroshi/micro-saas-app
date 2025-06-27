import importPlugin from "eslint-plugin-import"
import prettierPlugin from "eslint-plugin-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"

import { FlatCompat } from "@eslint/eslintrc"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

const compat = new FlatCompat({
  eslintRecommended: true,
  recommendConfig: true,
  stable: true,
})

const config = [
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error", { semi: false }],
      semi: ["error", "never"],
      quotes: ["error", "double", { avoidEscape: true }],
      "import/order": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^node:"],
            ["^react", "^next", "^[a-z]"],
            ["^lucide-react", "^sonner"],
            ["^@/components", "^@/utils", "^@/generated", "^@/.*"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  },
  ...compat.extends("next/core-web-vitals"),
]

export default config
