//判断两个变量是否相同
function isEqual(a, b) {

  let typeA = Object.prototype.toString.call(a)
  let typeB = Object.prototype.toString.call(b)
  //判断两项数据类型是否相同
  if (typeA !== typeB) {
    return false
  }
  if (Array.isArray(a)) {
    return arrayEqual(a, b)
  }
  //对象
  else if (typeof a === 'object') {
    return objEqual(a, b)
  }
  //函数
  else if (typeof a === 'function') {
    return funEqual(a, b)
  }
  //其他
  else {
    return baseEqual(a, b)
  }
}

//判断两个基本变量是否相同
function baseEqual(a, b) {
  return a === b
}

//判断两个数组是否相等
function arrayEqual(a, b) {
  if (a.length !== b.length) {
    return false
  }
  //循环判断每一项是否相等
  for (let i = 0; i < a.length; i++) {
    //是否相同
    if (!isEqual(a[i], b[i])) {
      return false
    }
  }
  return true
}

//判断两个对象是否相等
function objEqual(a, b) {
  //对比原型链是否相同
  if (a.prototype !== b.prototype) {
    return false
  }

  //获取两个函数的key
  let keyA = Reflect.ownKeys(a)
  let keyB = Reflect.ownKeys(b)

  //判断键的数量是否相等
  if (keyA.length !== keyB.length) {
    return false
  }
  //判断每个键是否相等
  for (let i = 0; i < keyA.length; i++) {
    let k = keyA[i]
    //判断键是否都存在
    if (Reflect.has(a, k) && Reflect.has(b, k)) {
      //判断两个键值是否相等
      if (!isEqual(a[k], b[k])) {
        return false
      }
    }
  }

  return true
}

//判断两个方法是否相等
function funEqual(a, b) {
  return a.toString() === b.toString()
}

let arr = [1, 2, 3, 4, 1, 2, {
    name: 'zhangsan',
    age: 15
  }, {
    name: 'xiaoming',
    age: 15
  }, {
    name: 'zhangsan',
    age: 15
  },
  [1, 2, 3],
  [1, 2],
  [1, 2, 3],
  function () {
    console.log(1);
  },
  function () {
    console.log(2);
  },
  function () {
    console.log(1);
  }
]

//数组去重
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (isEqual(arr[i], arr[j])) {
      arr.splice(j, 1)
      j--
    }
  }
}

console.log(arr);