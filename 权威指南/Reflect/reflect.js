`
  Reflect 与 Proxy 对象一样，为操作对象的API
  将Object一些明显属于语言内部的方法(defineProperty)放到 Reflect 上
  修改 Object 方法的返回值，让其变得合理。
  让Object操作变成函数行为，而不是命令式
  其方法和 Proxy 对象方法一一对应 , 可以让Proxy对象轻松保证原有操作
  很多操作变得更加简洁易读
  静态方法: apply() construct() get() set() defineProperty() deleteProperty() setPrototypeOf()
            has() ownKeys() isExtensible() preventExtensions() getOwnPropertyDescriptor() getPrototypeOf()
`

// let obj = {
//   a: 1,
//   b: 2
// }
// //  保持 set 的初始方法基础功能上添加 console.log()
// let objProxy = new Proxy(obj, {
//   set: function (target, prop, value) {
//     Reflect.set(target, prop, value)
//     console.log('输出了2')
//   }
// })

// console.log(objProxy.a = 2)


let myobj = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  }
}
let myReceiverObject = {
  foo: 4,
  bar: 4
}
// get(target,name,receiver)
//如果target对象中指定了getter，receiver则为getter调用时的this值。
console.log(Reflect.get(myobj, 'foo')) // 1 
console.log(Reflect.get(myobj, 'baz')) // 3
console.log(Reflect.get(myobj, 'baz', myReceiverObject)) //8

// set(target,name,receiver)
// 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
Reflect.set(myobj, 'foo', 3)
console.log(Reflect.get(myobj, 'foo')); //3

// has(obj,naem)  =  name in obj
Reflect.has(myobj, foo) //true

// deleteProperty(obj,name) = delete obj[name]
Reflect.deleteProperty(myobj, 'bar') //true

// construct(target,args)  =  new target(...args)
class Person {
  constructor(name) {
    this.name = name
  }
}
// let p = new Person('aaa')
let p = Reflect.construct(Person, ['aaa'])
console.log(p);

// getPrototypeOf(obj) = Object.getPrototypeOf(obj)
Reflect.getPrototypeOf(p) === Person.prototype

// setPrototypeOf(obj,newProto) = Object.setPrototypeOf(obj,newProto)
Reflect.setPrototypeOf(myobj, Array.prototype)
console.log(myobj.length) //0

// apply(func,thisArg,args) = Function.prototype.apply.call(func,thisArg,args)
// 如果一个函数自己定义了 apply 方法可以使用这两种方法绑定this
Reflect.apply(fn, thisObj, args) = Function.prototype.apply.call(fn, thisObj, args)

//defineProperty(target,propertyKey,attributes) = Object.defineProperty
Reflect.defineProperty(myobj, 'now', {
  value: () => {
    Date.now()
  }
})

// getOwnPropertyDescriptor(target,propertyKey) = Object.getOwnPropertyDescriptor
Reflect.getOwnPropertyDescriptor(myObject, 'hidden'); //可以获得 enumerable:false 的属性

// isExtensible(target) = Object.isExtensible
console.log(Reflect.isExtensible(myobj)); // true  是否可扩展

// preventExtensions(target) = Object.preventExtensions 
// 将对象变为不可扩展
console.log(Reflect.preventExtensions(myobj)); //true

// ownKeys(target) = Object.getOwnPropertyNames 和 Object.getOwnPropertySymbols 之和
console.log(Reflect.ownKeys(myObject));


//通过 Proxy 实现观察者模式
const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn)
const observable = obj => new Proxy(obj, {
  set: function (target, key, value, receiver) {
    Reflect.set(target, key, value, receiver)
    queuedObservers.forEach(observe => observe())
  }
})

const person = observable({
  name: '张三',
  age: 20
})

function print() {
  console.log(`${person.name},${person.age}`);
}
observe(print)
person.name = '李四'