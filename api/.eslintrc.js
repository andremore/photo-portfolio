module.exports = {
    root: true,
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-extra-semi': 'error',
    },
};
