const path = require('path')
const nodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')
const serverConfig = {
  mode: 'none',
  entry: './src/server',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    publicPath: '/', // 确保服务器端使用正确的公共路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]',
                exportGlobals: true,
                namedExport: false,
                exportLocalsConvention: 'camelCase',
                exportOnlyLocals: true, // 服务器端只导出类名，不包含 CSS 内容
              },
              // url: {
              //   filter: (url, resourcePath) => {
              //     // 确保 CSS 中的图片 URL 也使用相同的处理方式
              //     return true;
              //   }
              // }
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:5][ext]',
          emit: false, // 服务器端不输出图片文件
        },
      },
    ],
  },
}

module.exports = merge(baseConfig, serverConfig)
