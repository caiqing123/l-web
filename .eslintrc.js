module.exports = {
    extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        "import/resolver": {
            alias: {
                map: [
                    ["@", "./resources/web/src"],
                ],
                extensions: [".vue", ".json", ".js"]
            }
        }
    },
    plugins: ['vue'],
    parser: 'vue-eslint-parser',
    env: {
        browser: true,
        node: true,
        es6: true
    },
    rules: {
        "max-len":0,
        "camelcase": 0,
        "import/no-cycle":0,
        "no-multi-str": 0,
        "no-empty": 0,
        "quotes": 0,
        "no-use-before-define": 0,
        "standard/no-callback-literal": 0,
        "vue/valid-v-on": 0,
        "vue/no-side-effects-in-computed-properties": 0,
        "vue/max-attributes-per-line": 0,
        "vue/no-v-html": 0
    },
    overrides: [{
        files: ['*.vue', '*.jsx', '*.js'],
        rules: {
            // 这里写覆盖vue文件的规则
        },
    }],
}