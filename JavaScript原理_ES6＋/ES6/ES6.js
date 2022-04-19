`
let 和 const 

解构赋值 { a, b:y } = { a:1, b:2 }   a:1  y:2   b : not defined

模板字符串

字符串新方法:  includes()  startWidth()  endWidth()  trimStart() trimStart() trimEnd() replaceAll() at()

数值扩展: Number.isNaN()  Number.isInteger()  BigInt()
函数: 参数默认值  rest参数(...args)  name属性  箭头函数

数组的扩展: ...arr  concat()  Array.from()  find() findIndex() includes() flat() flatMap()

对象的扩展: 属性简写 属性枚举 属性遍历 super 

对象的方法: Object.is(NaN,NaN)->true  Object.assign() Object.getOwnPropertyDescriptors() Object.setPrototypeOf()
Object.keys() Object.values() Object.entries() Object.fromEntries()

运算符扩展: 指数2**3  obj?.prop  Null判断运算 ??

新原始数据类型: Symbol  Object.getOwnPropertySymbols()  Symbol.for()

数据结构: Set Map
Set: 类似数组,无重复值 add() delete() has() clear() keys() values() entries() forEach() size 
WeakSet: 成员只能是对象 弱引用(垃圾回收不考虑其中的引用)  add() delete() has()
Map: 键值对(可以为任意类型)  set() get() has() delete() clear() keys() values() entries() forEach()
WeakMap: 键名只能是对象  键名为弱引用(键值仍然为强引用) get() set() has() delete()
WeakRef:基于弱引用的数据结构  创建对象的弱引用  deref()

Proxy: new Proxy(taraget,handler)  
handler对象内的方法: get  set  apply  construct  has  ownKeys  deleteProperty   getOwnPropertyDescriptor  defineProperty 
preventExtensions  getPrototypeOf  isExtensible  setPrototypeOf 

Reflect: 和Proxy一样，为了操作Object 代替Object.的一些明显属于语言的方法 
静态方法(和 handler一样): get  set  apply  construct  has  ownKeys  deleteProperty   getOwnPropertyDescriptor  defineProperty 
preventExtensions  getPrototypeOf  isExtensible  setPrototypeOf

Promise: new Promise(function(resolve,reject){})
实例方法:then() resolve() reject() catch() finally() call() race() allSettled() any()
静态方法: Promise.try()

Iterator: 遍历器 主要是 Array/String/Map/Set/arguments/Object(对象需要部署iterator)    主要通过 for...of 遍历 内部调用的是 部署的 Symbol.iterator 方法
默认调用 Iterator 接口的场合 : for...of  解构赋值  扩展运算 Array.from() Map() Set() WeakMap() WeakSet() Promise.all() Promise.race() yield*
遍历对象的方法: next() return() throw()
.entries() =>  [[key,value],[key,value]]
.keys()    =>  [key,key]
.values()  =>  [value,value]

Generator: fn = function* helloWorld(){}  状态机，返回一个遍历器(Iterator)对象  内部通过yield控制执行阶段 通过fn.next()  转向下一阶段
Generator异步编程

async await 函数

Class  /  继承

模块开发  import / export / export default
`