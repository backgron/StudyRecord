let obj = Object.create({
  b: '原型链上的属性',
  [Symbol('ps')]: '原型链上的Symbol'
})
obj.a = '自己的属性'
let s = Symbol('s')
obj[s] = '自己的Symbol'
Reflect.defineProperty(obj, 'e', {
  value: "不可枚举的属性",
  enumerable: false
})


let obj2 = Object.assign(obj, Reflect.getPrototypeOf(obj))

console.log(obj2);