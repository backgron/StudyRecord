const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')
const clientConfig = {
  entry: './src/client',
  output: {
    filename: 'js/bundle.[hash:5].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/', // 确保客户端使用正确的公共路径
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.[hash:5].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]',
                exportGlobals: true,
                namedExport: false,
                exportLocalsConvention: 'camelCase',
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
        },
      },
    ],
  },
}

module.exports = merge(baseConfig, clientConfig)
