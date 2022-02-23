// ` new关键字  / new运算符
//   作用:通过new来创建对象实例  new Student()

//   new关键字会进行如下操作:
//   1.创建简单的空对象  obj = {}
//   2.为 obj 添加 __proto__ 属性，属性指向构造函数的原型对象(prototype)
//   3.将 obj 作为 this 的上下文
//   4.如果该函数没有返回对象，则返回this。
// `

// function Person(name, age) {
//   this.name = name
//   this.age = age
// }

// // 手写new
// function _new(fn, ...args) {
//   // let obj = {
//   //   __proto__: fn.prototype
//   // }
//   let obj = Object.create(fn.prototype)
//   let res = fn.apply(obj, args)
//   return (typeof res === 'object' && res !== null) ? res : obj
// }

// console.log(_new(Person, '张三', 15));
// console.log(new Person('张三', 15));

function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayHi = function () {
  console.log(this.name, this.age)
}

function myNew(constructor, ...arg) {
  let obj = Object.create(constructor.prototype)
  let res = constructor.call(obj, ...arg)
  return (typeof res === 'object' && res !== null) ? res : obj
}