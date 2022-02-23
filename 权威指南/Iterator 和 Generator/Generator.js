`
  Genertor 是 ES6 提供的一种异步编程解决方案
  Generator 是一个状态机 ，可以返回一个遍历器对象(Iterator)
  可以把 Generator 赋值给 Symbol.iterator 属性
  Gererator 中的this 不知想Generator函数  可以使用 f = F.call(F.prototype)  
`

//基本使用
function* hellowWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}

let hw = hellowWorldGenerator()
let res = hw.next()
while (!res.done) {
  console.log(res.value) // hello  world
  res = hw.next()
}
console.log(res.value) // ending


// next 方法可以传一个参数 会被当做上一个 yield 表达式的返回值，yield 表达式本身没有返回值
// 可以用来在每个 yield 阶段向方法中注入值

function* foo(x) {
  let y = 2 * (yield(x + 1))
  let z = yield(y / 3)
  return (x + y + z)
}

var a = foo(5)
console.log(a.next()); //{ value: 6, done: false }
console.log(a.next()); //{ value: NaN, done: false }
console.log(a.next()); //{ value: NaN, done: true }

var a = foo(5)
console.log(a.next()); //{ value: 6, done: false }
console.log(a.next(12)); //{ value: 8, done: false }
console.log(a.next(13)); //{ value: 42, done: true }