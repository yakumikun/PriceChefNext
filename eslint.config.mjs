// import { FlatCompat } from '@eslint/eslintrc';
// import js from '@eslint/js';

// const compat = new FlatCompat({
//   baseDirectory: import.meta.dirname,
//   recommendedConfig: js.configs.recommended,
// });

// const eslintConfig = [
//   ...compat.config({
//     root: true,
//     extends: ['eslint:recommended', 'plugin:@next/next/recommended', 'plugin:@typescript-eslint/recommended'],
//     overrides: [
//       {
//         files: ['**/*.{ts,tsx}'],
//       },
//     ],
//     parser: '@typescript-eslint/parser',
//     parserOptions: {
//       ecmaVersion: 2024,
//       sourceType: 'module',
//     },
//     settings: {
//       react: {
//         version: 'detect',
//       },
//     },
//   }),
//   {
//     ignores: ['.next/', '.node_modules/*'],
//   },
// ];

// export default eslintConfig;

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    root: true,
    extends: [
      'eslint:recommended',
      'plugin:@next/next/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    overrides: [
      {
        files: ['**/*.{ts,tsx}'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaVersion: 2024,
          sourceType: 'module',
        },
      },
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,  // 論理演算子（&&, ||）を許可
          allowTernary: true,       // 三項演算子を許可
        },
      ],
      '@next/next/no-img-element': 'off',
    },
  }),
  {
    ignores: ['.next/', '.node_modules/*'],
  },
];

export default eslintConfig;
