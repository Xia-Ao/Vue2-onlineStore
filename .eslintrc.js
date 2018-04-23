// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off', //关闭 强制 generator 函数中 * 号周围使用一致的空格
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', //生产模式下不允许debugger
        'semi': [1, 'always'],    //总是使用分号结尾，如果没有，则警告
        'indent': 0,  //不检查缩进
        'space-before-function-paren': [1, 'always'],  //要求不管什么函数，做括号前必须要求一个空格，否则则警告
        'comma-spacing': 0,   //不检查在逗号周围使用空格
        'no-multiple-empty-lines': [1, {'max': 3}],  //最多出现3行空行，否则则警告
        'space-infix-ops': 1,  //要求操作符周围有空格，否则则警告
        'no-unused-vars': 1, //禁止出现未使用过的变量,否则则警告
        'no-cond-assign': [2, "always"], // 在条件判读语句中禁止使用条件赋值
        'no-trailing-spaces':0 // 允许空行留白
    }
}
