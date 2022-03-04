// // call
// Function.prototype.myCall = function (context, ...args) {
//   if (typeof this !== 'function') {
//     throw new Error('type error')
//   }

//   context = context || globalThis

//   context.fn = this

//   res = context.fn(...args)

//   delete context.fn

//   return res
// }

// // apply
// Function.prototype.myApply = function (context, args) {
//   //判断当前是否为函数
//   if (typeof this !== 'function') {
//     throw new Error('type error')
//   }

//   //确定context的值
//   context = context || globalThis

//   //将this方法挂载到context  准备通过传入对象调用
//   context.fn = this

//   //调用  传参
//   res = context.fn(...args)

//   //返回结果
//   return res

// }

// //bind
// Function.prototype.myBind = function (context, ...args) {
//   if (typeof this !== 'function') {
//     throw new Error('type error')
//   }

//   //绑定存this
//   let fn = this

//   //返回
//   return function (...prop) {
//     return fn.apply(context, args.concat(...prop))
//   }
// }

// let a = {
//   a: 1
// }

// function log(x, y) {
//   return this.a + x + y
// }

// let fn = log.bind()
// console.log(fn(2))



Function.prototype.myCall = function (context, ...args) {
  let ctx = context || window
  ctx.fn = this
  res = ctx.fn(...args)
  Reflect.deleteProperty(ctx, 'fn')
  return res
}

Function.prototype.myBind = function (context, ...args) {
  let fn = this
  return function (...props) {
    return fn.apply(context, args.concat(props))
  }
}

function sayHi() {
  console.log(this.name)
}

let obj = {
  name: 'zhansan'
}

sayHi.myCall(obj)