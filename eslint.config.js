import js from '@eslint/js';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';

export default [
    {
        ignores: [
            'node_modules/',
            'dist/',
            'build/',
            'public/',
            '*.config.js',
            '*.cjs',
            '*.json',
            '*.md',
            '.eslintrc.json',
            '.prettierrc.json',
            '.eslintignore',
            '.prettierignore',
            'README.md',
        ],
    },

    js.configs.recommended,

    {
        files: ['**/*.{js,jsx}'],
        ...reactRecommended,
        ...reactJsxRuntime,
        languageOptions: {
            ...reactRecommended.languageOptions,
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            react: pluginReact,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            quotes: ['error', 'single'],
            'react/prop-types': 'off',
            'no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-vars': 'error',
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],
        },
    },

    prettierConfig,
];
