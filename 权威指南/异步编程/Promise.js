` Promise 异步编程解决方案
  Promise 有 pending/fulfilled/rejected 三种状态，不受外界影响，只受异步操作结果决定
  状态一旦改变，就不会再次发生变化，只能是 pending->fulfilled 或者 pending->rejected

  缺点 : 一旦创建，立即执行，无法取消 / 如果不设置回调函数，内部报错不会反应到外部 / 处于pending状态不知道进行到那个阶段

  一个异步操作的结果是返回另一个异步操作,这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。
  
  实例方法:then() catch() finally() 
  静态方法:Promise.resolve() Promise.reject() Promise.try() Promise.all() Promise.race() Promise.any() Promise.allSettled()()
  `

// 基本用法
const primise = new Promise(function (resolve, reject) {
  if (成功) {
    resolve(value) // pending -> resolved
  } else {
    reject(error) // pending -> rejected
  }
})

primise.then(function (value) {
  // 成功 (resolved) 所调用的回调函数
  console.log('执行成功', value);
}, function (error) {
  // 失败 (rejected) 所调用的回调函数
  console.log("执行失败", error);
})

//一个异步操作的结果是返回另一个异步操作,这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。
const p1 = new Promise(function (resolve, rejected) {
  setTimeout(() => rejected(new Error('fail1111'), 3000)) //输出 Error:fail1111
})
const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve(p1)
  }, 1000);
})
p2.then((res) => {
  console.log('成功', res)
}).catch(err => console.log('失败', err)) // 输出 失败 Error:fail1111




// .then()  可以只写成功(resolveFN)  返回一个新的promise对象，可以链式调用
promise.then(resolveFN, rejectFN)

// .catch()  失败的回调函数(简写.then())  也可以上方整个捕获过程中抛出的错误(throw Error)
promise.catch(rejectFn) = promise.then(null, rejectFN) = promise.then(undefined, rejectFN)
// 在resolve 后抛出的异常将不会被捕获 (一旦promise的状态发生改变(resolve) 将不会在改变(reject))
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
// 如果不使用 .catch()  promise 抛出的代码不会传递到外层  不会影响promise以外的代码运行
// 在node 中 可以通过 'unhandledRejection' 事件来监听未捕获的 reject 错误
process.on('unhandledRejection', function (err, promise) {
  throw err //err: 错误   promise:报错的 Promise 实例
})

// .finally()  无论最后状态如何，在执行 .then() 和 .catch() 后都会执行的函数
promise.then(resolveFN).catch(rejectFn).finally() = promise.then(finallyFN, finallyFN)

// .all()  将多个 promise 包装成一个 promise
const ps = Promise.all([p1, p2, p3]) // 参数需要有 Iterator 接口 且全部都是 promise对象
const ps = Promise.all([p1, p2, p3]).then(resolveFN).catch(rejectFN) // p1,p2,p3 全部fulfilled时 ps then() / 有一个为 rejcet 则ps catch()
// 如果 p1||p2||p3 有自己的 .catch()方法  则不会被 ps 的 catch 再次捕捉

// .race()
const ps = Promise.race([p1, p2, p3]) //当 p1,p2,p3 中有一个率先改变状态， ps的状态就会跟着改变，获得其返回值

// .allSettled() 等 p1,p2,p3 都执行结束后 ps  无论他们的结果状态都执行 fulfilled
const ps = Promise.allSettled([p1, p2, p3])

// .any() 等 p1,p2,p3 都执行结束后，只要有一个是 fulfilled  ps 就为 fulfilled
const ps = Promise.any([p1, p2, p3])

// .resolve() 将对象转换为 promise 对象
const p = Promise.resolve(obj) = new Promise(resolve => resolve(obj))

// .reject() 生成一个 Promise 对象的实例 p，状态为 rejected，回调函数会立即执行。
const p = Promise.reject(reason) = new Promise((resolve, reject) => reject())

// .try()  (提案)  当不知道一个犯法是同步还是异步的时候也可以使用
Promise.try(() => database.users.get({
  id: userId
}))