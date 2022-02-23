let obj = {
  a: 1,
  b: function () {

  },
  c: {
    d: 2
  }
}


//深拷贝

// 1.JSON.parse(JSON.stringify()) 
// 只能拷贝符合json的对象，function\symbol等拷贝不了
console.log(
  JSON.parse(JSON.stringify(obj))
)

// // 简单的深拷贝
let deepClone = function (obj) {
  let newObj = {}
  //判断是不是object
  if (typeof obj !== 'object') {
    return obj
  }

  //遍历对象中的所有属性
  for (let key in obj) {
    // 对象或者数组
    if (typeof obj[key] === 'object') {
      //数组
      if (Array.isArray(obj[key])) {
        // 递归复制数组
        newObj[key] = obj[key].map(item => deepClone(item)) //1  通过map复制数组
      } else {
        // 递归复制对象
        newObj[key] = deepClone(obj[key]) //2  通过递归复制对象
      }
    } else if (typeof obj[key] === 'function') {
      //返回新方法
      newObj[key] = obj[key].bind(newObj) //3  通过bind复制方法
    } else {
      //基本类型
      newObj[key] = obj[key] //4  直接返回复制基本类型
    }
  }
  return obj
}

console.log(deepClone(obj));





// 浅拷贝

// //   Object.assign()   可枚举属性
// console.log(Object.assign({}, obj));

// //   {...obj}        可枚举属性
// console.log({
//   ...obj
// });

// //  Object.getPrototypeOf()   原型链  所有属性(包括原型链上的)
// // Object.getOwnPropertyDescriptors()      
// //   所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。
// console.log(
//   Object.create(
//     Object.getPrototypeOf(s),
//     Object.getOwnPropertyDescriptors(s)
//   )
// )

// // 循环      可枚举属性
// let obj1 = {}
// for (let key in obj) {
//   obj1[key] = obj[key]
// }
// console.log(obj1)