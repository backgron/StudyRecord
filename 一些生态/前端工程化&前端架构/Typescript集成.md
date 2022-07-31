### 给老react项目添加typescript混用

1. 安装合适版本的依赖

   ```shell
   npm install --save @types/react @types/react-dom
   npm install --save-dev typescript awesome-typescript-loader source-map-loader
   ```

2. 添加 tsconfig.json 文件

   ```js
   {
     "compilerOptions": {
       "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
       "outDir": "./dist/", // 重定向输出目录
       "sourceMap": true, // 生成相应的 .map文件
       "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错。（默认为false，个人建议也为false，可以兼容之前的js代码，这里改为true是为了我自己检测哪些类型需要处理）
       "module": "esnext", // 模块引入方式
       "target": "es6", // 指定ECMAScript目标版本
       "moduleResolution": "node", // 决定如何处理模块
       "lib": [
         "esnext",
         "dom"
       ], // 编译过程中需要引入的库文件的列表。
       "skipLibCheck": true, //忽略所有库中的声明文件（ *.d.ts）的类型检查。
       "jsx": "react" // 在 .tsx文件里支持JSX
     },
     "include": [
       "./src/**/*", // 这个表示处理根目录的src目录下所有的.ts和.tsx文件，并不是所有文件
       "./typing.d.ts" // 如果有全局定义的typing记得加上
     ]
   }
   ```

3. 在webpack 处理js的loader后添加 处理tsx文件

   ```shell
   { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
   ```

4. 在webpack中添加resolve路径不全的方法参数

   ```js
   resolve: {
     extensions: [".ts", ".tsx", ".js", ".jsx"]
   },
   ```

**遇到的问题**

+ ```js
  // 因为混用，ts引入js文件会报错，因为js没有.d.ts文件，会被认定为隐式any类型
  // 1. 在tsconfig.json中配置      "noImplicitAny": false,   //不推荐使用
  // 2. 用 @ts-ignore 方式讲本行忽略ts的检测   // 针对复杂的难以重构的业务代码推荐 1
  // 3. 给文件添加 同名.d.ts 文件
  // 5. 将原本的js 文件改为基本的ts文件   // 针对公用组件推荐
  // 4. 如果是第三方库，可以去官方寻找是否有相关的types文件，并引入项目  // 推荐
  // 5. 配置全局的js文件的 typings.d.ts 为 any / unknow
  
  // ts文件引入css module的问题
  // 如果出现问题，可以使用配置全局的ts文件 typings.d.ts
  ```

+ 遇到 VSCode一直无法感应到typing.d.ts的问题，其他一切正常，也可以编译通过，不妨试着重启VSCode试试

# 参考文章

[在React旧项目中安装并使用TypeScript的实践 - 韩子卢 - 博客园 (cnblogs.com)](https://www.cnblogs.com/vvjiang/p/11944912.html)

