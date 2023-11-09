module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'prettier',
        'plugin:prettier/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'airbnb',
        'airbnb-typescript',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    rules: {
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/order': [
            'error',
            {
                'groups': [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'unknown',
                ],
                'pathGroups': [
                    {
                        pattern: 'react*',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'components/atoms/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: 'components/molecules/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: 'components/organisms/**',
                        group: 'internal',
                        position: 'after',
                    },

                    {
                        pattern: 'pages/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: 'types/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: 'utils/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: './**/*.scss',
                        group: 'unknown',
                    },
                ],
                'newlines-between': 'always',
            },
        ],
        '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/button-has-type': 'off',
        'object-curly-newline': 'off',
        'no-unused-vars': 'off',
        'prettier/prettier': 'error',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
