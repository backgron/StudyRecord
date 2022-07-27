# `NPM`

+ `npm` 众所周知的包管理工具，介绍如何发布一个`npm`包，并可以安装使用

## 文章介绍

+ 通过ts开发一个`npm`包，发到公网并下载使用

## 准备

+ 登录`npm`官方，注册`npm`账号，并且邮箱确定后激活

## 创建项目文件

1. 创建项目文件夹 -- `mynpmtest`

2. 进入文件夹，打开终端，输入`npm`初始化命令

```shell
npm init
```

3. 根据交互提示输入包的名称、版本、作者、开源协议等信息

   + 注意：发布到`public`时，包名不可以和之前的包冲突，可以通过加作者或者标志性前缀避免，也可以到官网进行搜索当前包名是否已经存在。

4. 创建好后，项目文件中将创建出`package.json`文件。

5. 创建项目目录

   -`mynpmtest`				项目根目录

   ​	--`src`				 	开发文件目录

   ​		---`index.ts`		开发入口文件

   ​	--lib						 打包文件目录

   ​	--`package.json` 

## 安装和配置依赖

1. `dev`环境下安装 `ts`

   ```shell
   npm i --save-dev typescript
   ```

2. 项目根目录创建 `tsconfig.json` 文件 并写入基本配置

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "target":"ES2015",
       "module":"CommonJS",
       "declaration": true,
       "moduleResolution": "node",
       "outDir":"./lib",
       "strict": true,
     },
     "include": ["src"],
     "exclude": ["node_modules"]
   }
   ```

## 根据项目和依赖配置package.json

1. 打开`package.json` 修改以下配置

   ```json
   {
     "name": "@backgron/mynpmtest",
     "version": "1.0.0",
     "description": "",
     "main": "lib/index.js",  // 入口文件
     "scripts": {
       "build": "tsc", // 打包命令
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "author": "backgron",
     "license": "ISC",
     "devDependencies": {
       "typescript": "^4.7.4"
     },
     "files": [  // npm publish 的文件
       "lib/**/*"
     ]
   }
   
   
   ```

2. `src`下写入开发文件

   + Hello

     ```ts
     // src/Hello/index.ts
     export default "Hello"
     ```

     World

     ```ts
     // src/World/index.ts
     export default "World"
     ```

3. `src/index.ts`引入上面的开发文件，并统一导出

   + `src/index.ts`

     ```ts
     export { default as Hello } from "./Hello"
     export { default as World } from "./World"
     ```

## 打包和发布

1. 执行打包命令

   ```shell
   npm run build
   ```

2. 添加npm用户

   ```shell
   npm adduser
   ```

3. 登录npm账号

   ```shell
   npm login
   ```

4. 设置允许发布到公网

   ```shell
   npm config set access public
   ```

5. 发布

   ```shell
   npm publish
   ```

## 使用

+ 按照日常使用`npm`的方法即可正常使用

1. 创建项目useSelfNpm，初始化npm

   ```shell
   npm init
   ```

2. 安装自己的包

   ```shell
   npm i @backgron/mynpmtest
   ```

3. 创建`index.js`文件夹

   ```js
   // index.js
   import {Hello} from '@backgron/mynpmtest'
   
   console.log(Hello)  // Hello
   ```

   注意：在使用`import`导入时记得去`package.json`加上`"type":"module"`