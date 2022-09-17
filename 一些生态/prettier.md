# Prettier

```js
module.exports = {
  // 1.一行代码的最大字符数，默认是80(printWidth: <int>)
  printWidth: 80,
  // 2.tab宽度为2空格(tabWidth: <int>)
  tabWidth: 2,
  // 3.是否使用tab来缩进，我们使用空格(useTabs: <bool>)
  useTabs: false,
  // 4.结尾是否添加分号，false的情况下只会在一些导致ASI错误的其工况下在开头加分号，我选择无分号结尾的风格(semi: <bool>)
  semi: false,
  // 5.使用单引号(singleQuote: <bool>)
  singleQuote: true,
  // 6.object对象中key值是否加引号（quoteProps: "<as-needed|consistent|preserve>"）as-needed只有在需求要的情况下加引号，consistent是有一个需要引号就统一加，preserve是保留用户输入的引号
  quoteProps: 'as-needed',
  // 7.在jsx文件中的引号需要单独设置（jsxSingleQuote: <bool>）
  jsxSingleQuote: false,
  // 8.尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
  trailingComma: 'es5',
  // 9.object对象里面的key和value值和括号间的空格(bracketSpacing: <bool>)
  bracketSpacing: true,
  // 10.jsx标签多行属性写法时，尖括号是否另起一行(jsxBracketSameLine: <bool>)
  jsxBracketSameLine: false,
  // 11.箭头函数单个参数的情况是否省略括号，默认always是总是带括号（arrowParens: "<always|avoid>"）
  arrowParens: 'always',
  // 12.range是format执行的范围，可以选执行一个文件的一部分，默认的设置是整个文件（rangeStart: <int>  rangeEnd: <int>）
  rangeStart: 0,
  rangeEnd: Infinity,
  // 18. vue script和style标签中是否缩进,开启可能会破坏编辑器的代码折叠
  vueIndentScriptAndStyle: false,
  // 19.    endOfLine: "<lf|crlf|cr|auto>" 行尾换行符,默认是lf,
  endOfLine: 'lf',
  // 20.embeddedLanguageFormatting: "off",默认是auto,控制被引号包裹的代码是否进行格式化
  embeddedLanguageFormatting: 'off',
}

// 14. requirePragma: <bool>,格式化有特定开头编译指示的文件 比如下面两种
/**
 * @prettier
 */
// or
/**
 * @format
 */

// 15.insertPragma: <bool> 自当插入pragma到已经完成的format的文件开头

// 16. proseWrap: "<always|never|preserve>" 文章换行,默认情况下会对你的markdown文件换行进行format会控制在printwidth以内

// 13. 指定parser,因为pretter会自动选择,所以一般不用指定(parser: "<string>"  parser: require("./my-parser"))
// "babel" (via @babel/parser) Named "babylon" until v1.16.0
// "babel-flow" (same as "babel" but enables Flow parsing explicitly to avoid ambiguity) First available in v1.16.0
// "babel-ts" (similar to "typescript" but uses Babel and its TypeScript plugin) First available in v2.0.0
// "flow" (via flow-parser)
// "typescript" (via @typescript-eslint/typescript-estree) First available in v1.4.0
// "espree" (via espree) First available in v2.2.0
// "meriyah" (via meriyah) First available in v2.2.0
// "css" (via postcss-scss and postcss-less, autodetects which to use) First available in v1.7.1
// "scss" (same parsers as "css", prefers postcss-scss) First available in v1.7.1
// "less" (same parsers as "css", prefers postcss-less) First available in v1.7.1
// "json" (via @babel/parser parseExpression) First available in v1.5.0
// "json5" (same parser as "json", but outputs as json5) First available in v1.13.0
// "json-stringify" (same parser as "json", but outputs like JSON.stringify) First available in v1.13.0
// "graphql" (via graphql/language) First available in v1.5.0
// "markdown" (via remark-parse) First available in v1.8.0
// "mdx" (via remark-parse and @mdx-js/mdx) First available in v1.15.0
// "html" (via angular-html-parser) First available in 1.15.0
// "vue" (same parser as "html", but also formats vue-specific syntax) First available in 1.10.0
// "angular" (same parser as "html", but also formats angular-specific syntax via angular-estree-parser) First available in 1.15.0
// "lwc" (same parser as "html", but also formats LWC-specific syntax for unquoted template attributes) First available in 1.17.0
// "yaml" (via yaml and yaml-unist-parser) First available in 1.14.0

// 17. htmlWhitespaceSensitivity: "<css|strict|ignore>" html中的空格敏感性

// 针对不同文件或目录设置不同配置的方法,json格式例子
// {
//   "semi": false,
//   "overrides": [
//     {
//       "files": "*.test.js",
//       "options": {
//         "semi": true
//       }
//     },
//     {
//       "files": ["*.html", "legacy/**/*.js"],
//       "options": {
//         "tabWidth": 4
//       }
//     }
//   ]
// }

```