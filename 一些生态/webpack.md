# Webpack

## 什么是Webpack

+ webpack是一个模块化打包工具，可以分析代码的依赖关系，通过转换形成文件依赖更为简单的项目文件
+ webpack的核心：Entry(入口)、Output(出口)、loader、plugins、mode

##  有什么用

+ 代码转换：将浏览器不能直接运行的代码转换成可以运行的代码 （TS、SCSS）
+ 文件优化：压缩JS、CSS、HTML代码，压缩合并图片（小图片base64）
+ 代码分割：提取多个页面的公共代码，提取首屏不需要的代码让其异步加载
+ 模块合并：将多个模块和文件合并为一个文件，减少文件复杂的依赖关系
+ 热刷新：提高开发效率
+ 代码校验：检测是否规范（ESLint）

## 常见的 loader

+ style-loader : 将编译完成的样式挂载到style标签上
+ css-loader : 用于识别.css文件，配合style-loader使用
+ less-loader ：处理less文件
+ sass-loader：处理sass/scss文件
+ postcss-loader：补充css样式各种浏览器内核前缀、将px转化为vm、**处理css兼容性问题**
+ file-loader：打包静态资源  除了html/css/js 的其他资源
+ url-loader：可以将小图片改为date-URL (base64)格式，减少http请求次数
+ html-loader:：处理html中的img资源
+ ts-loader：打包编译ts文件
+ eslint-loader: 需排除第三方库(node_modules)  需配置package.json
+ babel-loader：将ES6转化为ES5语法  **解决js兼容问题**  @babel/core @babel/preset-env  babel-polyfill (解决全局变量：Map、Set、Promise之类的新特性)
+ thread-loader： 多进程打包  进程启动也有开销，项目大的时候可以使用

## 常见的 plugin

+ html-webpack-plugin：打包HTML文件、自动引入js、css等资源
+ mini-css-extract-plugin：将css提取成单独文件，而不是内嵌在js中
+ optimize-css-assets-webpack-plugin：压缩css体积
+ workbox-webpack-plugin ：渐进式网络开发应用程序（可离线访问)

## mode的配置 devServer

```js
devServer: {
// 项目构建后路径
contentBase: resolve(__dirname, 'build'),
// 启动 gzip 压缩
compress: true,
// 端口号
port: 3000,
proxy:{
 '/api':{
    traget:'http://'
  }
},
// 自动打开浏览器
open: true
}
```

## webpack 性能优化

+ HMR : 热模块替换hot module replacement

  ```js
  devServer:{
      //开启HMR热替换
      hot:true;
  }
  ```

+ source-map ：映射源文件的错误信息、方便开发

  ```js
  devtool: 'source-map'  会生成map格式的文件，里面包含映射关系的代码
  devtool: 'inline-source-map' 不会生成map格式的文件，包含映射关系的代码会放在打包后生成的代码中
  devtool: 'inline-cheap-source-map' 一是将错误只定位到行，不定位到列。升打包构建的速度。
  devtool: 'inline-cheap-module-source-map' module会映射loader和第三方库
  devtool: 'eval' 用eval的方式生成映射关系代码，效率和性能最佳。但是当代码复杂时，提示信息可能不精确。
  
  开发环境:'cheap-module-eval-source-map'
  生产环境:'cheap-module-source-map'
  ```

+ oneOf : 将loader放入`oneOf:[]`中 每个类型的文件只会被一个loader匹配

+ babel缓存：第二次构建会读之前的缓存  在`babel-loader`中添加 `cacheDirectory:true`

+ tree-shaking：删除js代码死区的代码  (默认开启)

  ```js
  1. 只对 ES Module 起作用 不对commonjs起作用  因为commonjs是动态到处的
  2. babel默认转换为 commonjs  需要配置 
      	.babelrc的{module:false} 
  	和  .package.json 的 {sideEffects:false}  才可以 tree-shaking
  ```

+ lazy loading ：webpack 异步引入模块 加速首页访问速度

  ```js
  // 将代码打包为不同的 chunk
  optimization:{
      splitChunks:{
          chunks:'all'
      }
  } 
  ```

+ thread-loader： 多进程打包  进程启动也有开销，项目大的时候可以使用

  ```js
  {
      loader:'thread-loader',
      options:{
          worker:2 //两个进程
      }
  }
  ```

+ PWA：workbox-webpack-plugin  渐进式网络开发应用程序（可离线访问)

## webpack 的运行时代码

+ 通过  _webpack_modules__ 维护一个所有模块的数组

+ 通过 _webpack_require__ 手动实现加载一个模块

+ 通过 _webpack_require__(0) 运行第一个模块（入口模块）

  ```js
  // 将模块放入 _webpack_modules__
  const _webpack_modules__ = [
      ()=>{ `模块0 入口模块`},
      (module,_webpack_require__)=>{`模块1 第一个模块`}
  ]
  
  // _webpack_require__ 手动实现commonjs的模块加载
  const _webpack_require__ = (modulesId){
      // 创建模块
      const module={exports:{}}
      //调用执行 _webpack_modules__ 中管理的模块
      const m = _webpack_modules__[modulesId](module,_webpack_require__)
      return module.exports;
  }
  
  // _webpack_require__(0) 运行入口模块
  _webpack_require__(0)
  ```

# 其他

+ webpack-chain：提供可链式或顺流式的 API 创建和修改webpack 配置