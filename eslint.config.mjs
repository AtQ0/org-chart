import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReact from 'eslint-plugin-react';
// Import the plugin
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Set __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  ...compat.extends('next/core-web-vitals', 'plugin:prettier/recommended'),
  {
    plugins: {
      prettier: eslintPluginPrettier,
      react: eslintPluginReact, // Add the plugin here
    },
    rules: {
      'prettier/prettier': 'error', // Keep Prettier's rule for consistency
      'react/jsx-sort-props': [
        'error',
        {
          shorthandFirst: true, // Optional, controls shorthand props ordering
          callbacksLast: true, // Optional, puts callbacks last
        },
      ],
    },
    ignorePatterns: ['.next/', '.next/**'], // Add this line to ignore the .next folder
  },
];

export default config;
