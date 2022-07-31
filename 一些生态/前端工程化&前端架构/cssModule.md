### 老项目添加`css module`

+ 项目不断变大，出现了样式污染的问题，因为一开始没有使用`css module`，后期添加需要考虑兼容之前的地方，主要分为两个点：

  1. 考虑第三方包如`antd`的样式。
  2. 考虑到之前已经存在的`less`文件和引用方式。

+ **考虑第三方包如`antd`的样式**

  1. 可以在`loader`的配置中采用 `include` 和 `exclude` 排除 `node_modules` 中的文件
  2. 只对特定文件格式的文件开启 `css module`

+ **考虑之前已经存在的大量`less`文件**

  	1. 利用`babel`对导入文件进行分类的处理。
  	1. 只对特定文件格式的文件开启`css module`

+ **综上所述**： 项目采用只对特定的文件采用`css module`的形式。

  1. 约定采用`css module`文件的命名格式为 `xxx.m.less`

  2. `webpack`配置
     + 修改之前的`less`匹配机制 改为以 `.less` 结尾，但其中不包括 `.m.` 的文件
     + 新增对包含 `.m.` 并且以 `.less` 结尾文件的loader处理逻辑，配置`css module`
     + 新增的`loader`处理逻辑中添加 `exclude` 不对`node_modules`中的文件编译。

+ **遇到的问题**

  1. less-loader 3.0 需要开启 `javascriptEnabled: true`,

+ 附：`webpack loader`配置：

```js
			{
				test: /^(?!.*\.m\.).*\.css$/, // 匹配包括 .m. 并且以 .css结尾
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'thread-loader'],
			},
			{
				test: /^(?!.*\.m\.).*\.less$/, // 匹配包括 .m. 并且以 .less结尾
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							modifyVars: {
								'primary-color': '#199ABA',
							},
							javascriptEnabled: true,
						},
					},
					'thread-loader',
				],
			},
			{
				test: /\.m\.(css|less)$/, // 匹配包括 .m. 并且以 css|less 结尾的
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]_[local]--[hash:base64:9]',
						},
					},
					'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							modifyVars: {
								'primary-color': '#199ABA',
							},
							javascriptEnabled: true,
						},
					},
					'thread-loader',
				],
				exclude: [path.resolve(__dirname, 'node_modules')],
			},
```

### 