# Nodejs

- [Node.js 简介 (nodejs.cn)](http://nodejs.cn/learn)

## 常见的全局 变量 / 对象

- **__filename**：正在执行脚本的绝对路径
- **__dirname**：正在执行脚本所在目录
- **timer**类函数：执行顺序与事件循环之间的关系(`setTimeout` ...)
- **global**：
- **buffer**：
- **process**：提供与当前进程互动的接口
- **require**：模块导入
- **module** 、**exports**：模块导出

### global

### process

- 查看资源

  ```js
  process.memoryUsage() // 获取内存信息
  process.cpuUsage() // 获取CPU信息
  ```

- 查看运行环境

  ```js
  process.cwd() //当前的运行目录
  process.version //node版本
  process.versions //运行环境
  process.arch //CPU架构
  process.platform //操作系统平台
  process.env //用户环境
  process.env.NODE_ENV //node环境
  process.env.PATH //path环境变量
  process.env.USERPROFILE //用户文件
  ```

- 运行状态

  ```js
  process.argv // 参数
  process.argv0 //快速拿到 process.argv[0]
  process.pid // 当前进程id
  process.ppid // 当前进程的父id
  process.uptime() // 进程从开始到此处的时间
  ```

- 事件

  ```js
  process.on("exit", (code) => {}) // 退出时  回调内只能执行同步代码，调用后会关闭进程，无法再执行同步代码
  process.on("beforeExit", (code) => {}) //退出前 可以执行异步代码
  ```

- 操作

  ```js
  process.exit() // 退出进程  退出进程后，后面的代码不会继续执行
  process.stdout //标准输出  是一个流
  process.stdout.write() //输出到控制台
  process.stdin //标准输入  是一个流
  process.stdin.on("readable", () => {}) // 监听事件
  process.stdin.setEncoding("utf-8") //设置编码
  process.nextTick() // 在下一次事件循环前执行的回调（当前任务队列清空后）执行优先级高于一般的微任务
  ```

### Buffer

1. 实现 `Nodejs` 平台下的二进制操作

2. 不占据 `V8` 堆内存大小的内存空间

3. 内存使用 `Node` 来控制，由 `V8` 的 `GC` 回收

4. 一般配合 `Stream` 流使用，充当数据缓冲区

- 创建 Buffer 实例

  ```js
  Buffer.alloc() //创建指定字节大小的buffer
  Buffer.allocUnsafe() //创建指定大小的buffer（不安全）
  Buffer.from() //接收数据，创建buffer
  ```

- Buffer 实例方法

  ```js
  fill() //使用数据填充buffer并返回
  write() //向buffer中写入数据
  toString() //从buffer中提取数据
  slice() //截取buffer
  indexOf() //在buffer中查找数据
  copy() //拷贝buffer中的数据
  ```

- Buffer 静态方法

  ```js
  concat() //拼接
  isBuffer() // 判断是否为Buffer类型
  ```

## 核心模块

### path 模块

- 常用 API

  ```js
  basename(pathStr, extStr) // 获取路径中基础名称 返回路径中的最后一部分(最后的路径分隔符会被忽略)
  dirname() // 获取路径中目录名称 返回当前目录的路径
  extname() // 获取路径中扩展名称
  isAbsolute() // 判断路径是否为绝对路径  true-false
  join() // 拼接路径
  resolve() //返回绝对路径 resolve([form],to) 把路径拼成绝对路径，如果不是绝对路径，会把cwd路径拼接到前面（[form]默认是cwd）
  paser() // 解析路径 把路径变成{root,dir,base,ext,name}对象
  format() //序列化路径 把{root,dir,base,ext,name}对象转化为路径字符串
  normalize() //路径规范化
  ```

### fs 模块

- 文件操作

  ```js
  readFile() // 从指定文件中读取数据 路径不存在会显示路径错误
  read() // 结合buffer按字节读取大文件
  writeFile() // 向指定文件中写入数据 路径不存在会创建路径

  appendFile() // 追加的方式向指定文件中写入数据
  copyFile() // 将某个文件助攻的数据拷贝至另一个文件
  watchFile() // 对指定文件进行监控
  ```

- 文件打开与关闭

  ```js
  open() // 打开一个文件
  close() // 关闭一个文件
  ```

- 目录操作

  ```js
  access() // 判断文件或目录是否具有操作权限
  stat() // 获取目录及文件信息
  mkdir() // 创建目录
  rmdir() // 删除目录
  readdir() // 读取目录中的内容
  unlink() // 删除指定文件
  ```

### vm 模块

- `vm` 模块允许在 `V8` 虚拟机上下文中编译和运行代码

* `JavaScript` 代码可以立即编译并运行，也可以编译保存，稍后运行
* 在不同的 `V8` 上下文中运行的代码，意味着被调用的代码与调用代码具有不同的全局对象
* 可以通过上下文隔离化一个对象来提供上下文，调用的代码将上下文中的任何属性视为全局变量，由调用的代码引起的对全局变量的任何更改都反应在上下文中。

  ```js
  runInThisContext() //在当前 global 对象的上下文中运行 vm.Script   包含的编译代码。 运行代码无权访问局部作用域，但可以访问当前 global 对象。
  ```

### EventEmitter 模块

- 统一管理事件的监听和分发

  ```js
  // 实例方法
  on() // 监听（订阅）一个事件
  emit() // 触发（发布）一个事件
  once() // 监听一个事件（一次性）
  off() // 取消事件监听
  ```

## 模块化

### Nodejs 与 CommonJS 规范

- 在`Nodejs`中，任意一个文件就是一个模块，具有独立作用域
- 使用`require`导入其他模块
- 将模块`ID`传入`require`实现目标模块定位
- 模块加载是同步进行的

### 模块化分类和加载流程

#### 分类

- 核心模块：`Node` 源码编译写入到二进制文件中（快）
- 文件模块：代码运行时，动态加载（慢）

#### 加载流程

- 路径分析、文件定位、编译执行

1. 路径分析：依据标识符确定模块位置

   - 路径标识符

   - 非路径标识符

2. 文件定位：确定目标模块中具体的文件以及文件类型

   - 按照 `.js` `.json` `.node` 补足模块名
   - 如果都找不到，回去查找 `package.json` 文件，使用 `JSON.parse()`解析
   - 如果还找不到 `.js` `.json` `.node` ,会将 index.js `index.json` `index.node` 进行解析
   - 如果还是没有，则会抛文件不存在异常

3. 编译执行：采用对应的方式完成文件的编译执行

   1. JS 文件

      - 使用 `fs` 模块同步读入目标文件内容

      - 对内容进行语法包装，生成可执行 `JS` 函数
      - 调用函数时传入 `exports`、`module`、`require` 等属性

   2. JSON 文件

      - 通过 `JSON.parse()`进行解析
      - 将解析结果返回给 `exports` 对象

4. 缓存优化原则：提高模块加载速度

   - 标识符确定模块路径后，回去缓存中查找是否存在想要的模块如果有直接返回，如果没有，则执行完整的加载流程
   - 执行完整的加载流程之后，会使用路径作为索引进行缓存，提高下次加载速度

### module 属性

```js
// 任意`js`文件就是一个模块，可以直接使用 module 属性
id // 返回模块标识符，一般是一个绝对路径
filename // 返回文件模块的绝对路径
loaded // 返回布尔值，表示模块是否完成加载
parent // 返回对象从存放调用当前模块的模块
children // 返回数组，存放当前模块调用的其他模块
exports // 返回当前模块需要暴露的内容
paths // 返回数组，存放不同目录下的node_modules位置
```

### require 属性

```js
// 基本功能是读入并且执行一个模块文件
resolve // 返回模块文件绝对路径
extensions // 根据不同后缀名执行解析操作
main // 返回主模块对象
```

## Nodejs 下的事件循环机制

- 执行同步代码，将不同的任务添加至相应的队列
- 执行满足条件的微任务
- 按照以下任务（`Nodejs` 环境） `timers` -> `close` 执行宏任务

  1. **timers**: 执行 `setTimeout` 和 `setInterval` 回调
  2. **pending callbacks**: 执行操作系统的回调，如 `tcp` `udp`
  3. **idle**,**perpare**：只在系统内部进行使用
  4. **poll**：执行 `I/O` 相关的回调
  5. **check**：执行 `setImmediate` 中的回调（比 `setTimeout(0)`性能好，更稳定）
  6. **close** **callbacks**：执行 `close` 事件的回调

  - 注意：`setTimeout` 延时为 `0` 时可能会出现误差，导致实际结果大于 `0`，可能会比以下的后执行，精确的来讲，设置的 `0` 只时的最小值，可能会大于 `0`

    ```js
    setTimeout(() => {
      console.log(1)
    }, 0)
    setImmediate(() => {
      console.log(2)
    })
    //  输出可能是：1 2
    //  也可能是：  2 1
    //  顺序是不固定的
    ```

  - 注意：以上为任务队列的执行顺序，不一定就是表面上看起来的代码输出顺序，比如在执行完同步代码后会去执行 `poll` 的回调，这时 `poll` 的回调中出现 `setImmediate` 和 `setTimeout`，会按照以上任务队列执行顺序，先执行 `setTmmediate`，后第二次循环再执行 `setTimeout`

    ```js
    const fs = require("fs")
    fs.readFile(".m1.js", () => {
      setTimeout(() => {
        console.log(1)
      }, 0)
      setImmediate(() => {
        console.log(2)
      })
    })
    // 输出为 ： 2 1
    // 顺序是固定的
    ```

- 注意：执行宏任务之前要清空微任务队列
- 注意：以上为 `Nodejs` 的事件循环机制，与浏览器略微不同

## 第三方包

- **marked**： `md` 文件转化 `html` 文件
- **browser-sync** ：开启一个页面服务器
