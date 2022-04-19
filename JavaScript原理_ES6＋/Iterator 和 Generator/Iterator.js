// Iterator 遍历器
// 任何数据结构只要部署了 Iterator 接口，就可以完成遍历操作 for...of
// 默认实现 Iterator 接口的数据结构  ： Array Map Set String
// 接口部署在 Symbol.iterator(是一个Iterator生成器) 属性上 只要存在这个属性，便认为是可遍历的

// 默认调用Iterator 接口的操作  ： 解构赋值 / 扩展运算符... / yield* / for...of / Array.from / Promise.all /new Map

// 遍历器对象的方法: next()必须 /   return() throw() 可选 
// return() : for...of 循环提前退出 （出现错误或者break） 可以用来释放资源

//手动实现数组的迭代器：
// 创建制作迭代器的方法
let myArrayIteratorMaker = function (array) {
  //从0开始  index形成闭包
  let index = 0
  //返回迭代器对象
  return {
    //实现迭代器的next方法
    next: function () {
      return index < array.length ? {
        value: array[index++]
      } : {
        done: true
      }
    }
  }
}

//自制迭代器的使用
let arr = [1, 2, 3, 4]
let arrIt = myArrayIteratorMaker(arr)
let arrIt2 = myArrayIteratorMaker(arr)
let res = arrIt.next()

while (!res.done) {
  console.log(res.value);
  res = arrIt.next()
}

let res2 = arrIt2.next()

while (!res2.done) {
  console.log(res2.value);
  res2 = arrIt2.next()
}

// 手动为Object挂载[Symbol.iterator]属性，实现object的遍历啊
let obj = {
  name: '小明',
  age: 15,
  sex: '男',
  [Symbol.iterator]: function () {
    let obj = this
    let props = Object.keys(this) //不可获取 Symbol属性
    // let props = Reflect.ownKeys(this) //可获取 Symbol 属性
    let index = 0
    return {
      next: function () {
        return index < props.length ? {
          value: obj[props[index++]]
        } : {
          done: true
        }
      }
    }
  }
}

for (let key of obj) {
  console.log(key);
}

console.log(...obj); //小明 15 男
console.log(Array.from(obj)); // [ '小明', 15, '男' ]