module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    settings: {
        "linkComponents": [
            { "name": "Link", "linkAttribute": "to" },
        ],
    },
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^h$' }],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/explicit-function-return-type': ['warn', {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
        }],
        'eqeqeq': ['warn', 'always'],
        'jsx-quotes': ["warn", "prefer-single"],
        'no-multiple-empty-lines': ["warn", { max: 1, maxEOF: 0, maxBOF: 0 }],
        'semi': ["warn", "never"],
        "comma-dangle": ["warn", "always-multiline"],
        "indent": ["warn", 4],
    },
}